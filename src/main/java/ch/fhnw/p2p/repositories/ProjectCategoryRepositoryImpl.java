package ch.fhnw.p2p.repositories;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Criteria;
import ch.fhnw.p2p.entities.CriteriaRating;
import ch.fhnw.p2p.entities.Locale;
import ch.fhnw.p2p.entities.Member;
import ch.fhnw.p2p.entities.MemberRating;
import ch.fhnw.p2p.entities.Project;
import ch.fhnw.p2p.entities.ProjectCategory;
import ch.fhnw.p2p.entities.ProjectCriteria;

@Component
public class ProjectCategoryRepositoryImpl {

	private Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private ProjectRepository projectRepo;

	@Autowired
	private ProjectCriteriaRepository projectCriteriaRepo;

	@Autowired
	private ProjectCategoryRepository projectCategoryRepo;
	
	@Autowired
	private CriteriaRepository criteriaRepo;
	
	

	/**
	 * add or remove team members
	 * 
	 * @param Project the user's current project
	 * @param Members the updated list of members to add or remove from project
	 * @return Project the updated project
	 */
	public Project updateProjectCategories(Project project, List<ProjectCategory> updatedCategories) {
		Set<ProjectCategory> projectCategories = new HashSet<ProjectCategory>();

		try {
			// Set categories and criterias
			for (ProjectCategory projCat : updatedCategories) {
				ProjectCategory projectCategory = projectCategoryRepo.findOne(projCat.getId());

				for (ProjectCriteria projCrit : projCat.getProjectCriterias()) {
					
					// Add new criteria
					if (projCrit.isAdded()) {
						ProjectCriteria projectCriteria = null;
						if (projectCategory.getCategory().getType() == Category.Type.SELFDEFINED) {
							logger.info("Add self-defined criteria");
							Criteria criteria = new Criteria(projCrit.getCriteria().getLabel(), Locale.Language.EN);
							criteria.setCategory(projectCategory.getCategory());
							criteria = criteriaRepo.save(criteria);

							projectCriteria = new ProjectCriteria(criteria);
							projectCriteria.setCategory(projectCategory);
							projectCategory.getProjectCriterias().add(projectCriteria);
						} else {
							logger.info("Add criteria (id='" + projCrit.getCriteria().getId() + "')");
							projectCriteria = new ProjectCriteria(criteriaRepo.findOne(projCrit.getCriteria().getId()));
							projectCriteria.setCategory(projectCategory);
							projectCategory.getProjectCriterias().add(projectCriteria);
						}
						// Update members
						addCriteriaToRatings(project, projectCriteria);
					}

					// Remove existing criteria
					if (projCrit.isRemoved()) {
						logger.info("Remove criteria (id='" + projCrit.getId() + "'");
						ProjectCriteria projectCriteria = projectCriteriaRepo.findOne(projCrit.getId());
						projectCategory.getProjectCriterias().remove(projectCriteria);
						// Update members
						removeCriteriaFromRatings(project, projectCriteria);
					
					// Update criteria
					} else if (projectCategory.getCategory().getType() == Category.Type.SELFDEFINED
							&& projCrit.isUpdated()) {
						logger.info("Update criteria (id='" + projCrit.getId() + "'");
						Criteria criteria = criteriaRepo.findOne(projCrit.getCriteria().getId());
						criteria.setLabel(projCrit.getCriteria().getLabel());
						criteriaRepo.save(criteria);
					}
				}
				projectCategories.add(projectCategory);
			}

			project.setProjectCategories(projectCategories);

			return projectRepo.saveAndFlush(project);
		} catch (Exception e) {
			logger.error("Error while updating categories", e);
			throw e;
		}
	}

	/**
	 * adds the new criteria to each team member rating
	 * 
	 * @param project the project which members should be updated
	 * @param new project criteria
	 * @return project with the updated team member ratings
	 */
	public Project addCriteriaToRatings(Project project, ProjectCriteria newProjectCriteria) {
		// Add criteria to the related category for each member's member rating
		for (Member member : project.getMembers()) {
			for (MemberRating memberRating : member.getMemberRatings()) {
				memberRating.getCriteriaRatings().add(new CriteriaRating(newProjectCriteria, memberRating));
				memberRating.setStatus(MemberRating.Status.OPEN);
			}
			// Reset status to open
			if (member.getStatus() != Member.Status.NEW) {
				member.setStatus(Member.Status.OPEN);
			}
		}

		return project;
	}

	/**
	 * removes the project criteria from each team member rating
	 * @param project the project which members should be updated
	 * @param the project criteria to be removed
	 * @return project with the updated team member ratings
	 */
	public Project removeCriteriaFromRatings(Project project, ProjectCriteria removedProjectCriteria) {
		// remove criteria from each member's member rating
		for (Member member : project.getMembers()) {
			for (MemberRating memberRating : member.getMemberRatings()) {
				CriteriaRating critRating = memberRating.getCriteriaRatings().stream()
						.filter(r -> r.getCriteria().getId() == removedProjectCriteria.getId()).findFirst().get();
				
				memberRating.getCriteriaRatings().remove(critRating);
			}
		}

		return project;
	}
}
