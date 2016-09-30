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
  deleteCriteria,
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
    selectCriterias: category.selectCriterias.filter(selectedCriteria =>
      !category.criterias.find(criteria =>
        criteria.id === selectedCriteria.id)),
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
  handleDelete: criteria => dispatch(deleteCriteria(criteria)),
  handleAdd: categoryId => dispatch(addCriteria(categoryId)),
  handleChange: (criteriaId, categeoryId) => dispatch(setCriteria(criteriaId, categeoryId)),
  handleValueChanged: (value, criteriaId, categeoryId) => dispatch(setCriteriaValue(value, criteriaId, categeoryId)),
  handleEdit: (criteriaId, categeoryId) => dispatch(editCriteria(criteriaId, categeoryId)),
  handleSave: () => dispatch(saveCriterias(props)),
  handleCancel: () => dispatch(cancel(props)),
});

const CriteriaOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaOverviewComponent);

export default withRouter(CriteriaOverview);
