// React imports
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Component imports
import CriteriaPage from '../ui/pages/CriteriaPage.jsx';

// Action imports
import { setTitle } from '../actions/app.js';
import {
  addCriteria,
  setCriteria,
  setCriteriaValue,
  saveCriteria,
  deleteCriteria,
  fetchCriteria,
} from '../actions/criteria.js';


class CriteriaOverviewComponent extends Component {
  componentDidMount() {
    this.props.initializeTitle();
    this.props.fetchCriteria();
  }

  render() {
    return (<CriteriaPage {...this.props} />);
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

const mapDispatchToProps = dispatch => ({
  initializeTitle: () => dispatch(setTitle('My Ratings')),
  fetchCriteria: () => dispatch(fetchCriteria()),
  handleDelete: criteria => dispatch(deleteCriteria(criteria)),
  handleAdd: categoryId => dispatch(addCriteria(categoryId)),
  handleChange: (criteriaId, categeoryId) => dispatch(setCriteria(criteriaId, categeoryId)),
  handleValueChanged: (value, criteriaId, categeoryId) => dispatch(setCriteriaValue(value, criteriaId, categeoryId)),
  handleSave: (criteriaId, categeoryId) => dispatch(saveCriteria(criteriaId, categeoryId)),
});

const CriteriaOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaOverviewComponent);

export default withRouter(CriteriaOverview);
