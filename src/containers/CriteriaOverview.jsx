// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import EditCriteriaPage from '../ui/pages/EditCriteriaPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import {
  addCriteria,
  removeCriteria,
  editCriteria,
  fetchCriteria,
  saveCriterias,
  setCriteria,
  setCriteriaValue,
  cancel,
} from '../actions/criteria.js';


class CriteriaOverviewComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
    this.props.fetchCriteria();
  }

  render() {
    return (<EditCriteriaPage {...this.props} />);
  }
}

CriteriaOverviewComponent.propTypes = {
  initializeTitle: React.PropTypes.func,
  fetchCriteria: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { categories, readonly, ...other } = globalState.criteria;

  const updatedCategories = categories ? categories.map(category => ({
    ...category,
    criterias: category.criterias.filter(criteria => !criteria.removed),
    selectCriterias: category.selectCriterias.filter(selectedCriteria =>
      !category.criterias.find(criteria =>
        criteria.criteriaId === selectedCriteria.criteriaId)),
  })) : [];

  return {
    ...props,
    ...other,
    title: 'Criteria',
    categories: updatedCategories,
    readonly,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  initializeTitle: () => dispatch(setTitle('My Ratings')),
  fetchCriteria: () => dispatch(fetchCriteria()),
  handleDelete: criteria => dispatch(removeCriteria(criteria)),
  handleAdd: category => dispatch(addCriteria(category)),
  handleChange: (criteriaId, category) => dispatch(setCriteria(criteriaId, category)),
  handleValueChanged: (value, criteria, category) => dispatch(setCriteriaValue(value, criteria, category)),
  handleEdit: (criteria, category) => dispatch(editCriteria(criteria, category)),
  handleSave: () => dispatch(saveCriterias(props)),
  handleCancel: () => dispatch(cancel(props)),
});

const CriteriaOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaOverviewComponent);

export default withRouter(CriteriaOverview);
