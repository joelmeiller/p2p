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
  const { categories, readonly } = globalState.criteria;

  return {
    title: 'Criteria',
    categories,
    readonly,
    ...props,
  };
};

const mapDispatchToProps = dispatch => ({
  initializeTitle: () => dispatch(setTitle('My Ratings')),
  fetchCriteria: () => dispatch(fetchCriteria()),
  handleDelete: criteria => dispatch(deleteCriteria(criteria)),
  handleAdd: criteria => dispatch(addCriteria(criteria)),
});

const CriteriaOverview = connect(
  mapStateToProps,
  mapDispatchToProps
)(CriteriaOverviewComponent);

export default withRouter(CriteriaOverview);
