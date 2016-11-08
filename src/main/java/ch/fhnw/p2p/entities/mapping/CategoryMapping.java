package ch.fhnw.p2p.entities.mapping;

import ch.fhnw.p2p.entities.Category;
import ch.fhnw.p2p.entities.Category.Type;
import lombok.Data;

@Data
public class CategoryMapping {

	private Long id;
	private String title;
	private Type type;
	
	public CategoryMapping() {};
	
	public CategoryMapping(Category category) {
		this.id = category.getId();
		this.title = category.getTitle();
		this.type = category.getType();
	}
}
