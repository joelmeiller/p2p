import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import TextTruncate from 'react-text-truncate';

import { MenuItem, FontIcon } from 'material-ui';

const CLEAR_SUGGESTIONS = '/autosuggest/CLEAR';
const GET_SUGGESTIONS = '/autosuggest/GET_SUGGESTIONS';
const SET_SUGGESTIONS = '/autosuggest/SET_SUGGESTIONS';
const SET_VALUE = '/autosuggest/SET_VALUE';

const initialState = {
  suggestions: [],
  value: '',
};

// When suggestion is clicked, Autosuggest needs to populate the input field
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => `${suggestion.name}, ${suggestion.email}`;

const setValue = value => ({
  type: SET_VALUE,
  value,
});

// Autosuggest will call this function every time you need to update suggestions.
// You already implemented this logic above, so just use it.
const setSuggestions = (suggestion, props) => (dispatch) => {
  props.onSuggestionSelected(suggestion);

  dispatch({
    type: CLEAR_SUGGESTIONS,
  });
};

// Autosuggest will call this function every time you need to update suggestions.
// You already implemented this logic above, so just use it.
const fetchSuggestions = (pattern, middleware) => (dispatch) => {
  middleware(pattern, (suggestions) => {
    dispatch({
      type: SET_SUGGESTIONS,
      suggestions,
    });
  });

  dispatch({
    type: GET_SUGGESTIONS,
    value: pattern,
  });
};

// Autosuggest will call this function every time you need to clear suggestions.
const clearSuggestions = () => ({
  type: CLEAR_SUGGESTIONS,
});


export const reducer = (state = initialState, action) => {
  const { type, ...params } = action;
  switch (type) {
    case GET_SUGGESTIONS:
    case SET_SUGGESTIONS:
      return {
        ...state,
        ...params,
      };
    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
        value: '',
      };
    default:
      return state;
  }
};


// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <MenuItem
    value={suggestion.id}
    primaryText={
      <TextTruncate
        line={1}
        truncateText={'...'}
        text={`${suggestion.name}, ${suggestion.email}`}
        containerClassName="suggestion-text"
      />
    }
    rightIcon={<FontIcon className="material-icons">add</FontIcon>}
    style={{ width: '250px', fontSize: '14px' }}
  />
);

const AutoSuggestComponent = props => (
  <Autosuggest
    suggestions={props.suggestions}
    onSuggestionsFetchRequested={props.handleSuggestionsFetchRequested}
    onSuggestionsClearRequested={props.handleSuggestionsClearRequested}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    inputProps={{
      placeholder: 'Select Student',
      value: props.value,
      onChange: (e, { value }) => props.handleChange(value),
    }}
    onSuggestionSelected={(event, { suggestion }) => props.handleSuggestionSelected(suggestion)}
  />
);

const suggestionType = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  email: React.PropTypes.string,
};

AutoSuggestComponent.propTypes = {
  suggestions: React.PropTypes.arrayOf(React.PropTypes.shape(suggestionType)),
  handleSuggestionsFetchRequested: React.PropTypes.func,
  handleSuggestionsClearRequested: React.PropTypes.func,
  handleSuggestionSelected: React.PropTypes.func,
  value: React.PropTypes.string,
  handleChange: React.PropTypes.func,
};

const mapStateToProps = (globalState, props) => {
  const { suggestions, value } = globalState.autosuggest;

  return {
    ...props,
    suggestions,
    value,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  handleSuggestionsFetchRequested: ({ value }) => dispatch(fetchSuggestions(value, props.middleware)),
  handleSuggestionsClearRequested: () => dispatch(clearSuggestions()),
  handleSuggestionSelected: suggestion => dispatch(setSuggestions(suggestion, props)),
  handleChange: value => dispatch(setValue(value)),
});

const AutoSuggest = connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoSuggestComponent);

export default AutoSuggest;
