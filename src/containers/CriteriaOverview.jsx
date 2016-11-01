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
  cancel,
  editCriteria,
  fetchCriteria,
  removeCriteria,
  saveCriterias,
  setCriteria,
  setCriteriaValue,
  setNewCriteriaValue,
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
  handleAdd: category => dispatch(addCriteria(category)),
  handleCancel: () => dispatch(cancel(props)),
  handleChange: (criteriaId, category) => dispatch(setCriteria(criteriaId, category)),
  handleDelete: criteria => dispatch(removeCriteria(criteria)),
  handleEdit: (criteria, category) => dispatch(editCriteria(criteria, category)),
  handleNewValue: (value, category) => dispatch(setNewCriteriaValue(value, category)),
  handleSave: () => dispatch(saveCriterias(props)),
  handleValueChanged: (value, criteria, category) => dispatch(setCriteriaValue(value, criteria, category)),
});

const CriteriaOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaOverviewComponent);

export default withRouter(CriteriaOverview);
