import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import FinalRating from '../components/FinalRating.jsx';
import H2Progress from '../components/H2Progress.jsx';
import BlockSubcriteria from '../components/BlockSubcriteria.jsx';
import H3Input from '../elements/H3Input.jsx';


const EvaluationPage = props => (
  <div className="container push-top-small">
    <div className="row">
      <div className="col-xs-11">
      {/* TODO: i18n */}
        {(props.rating ?
          <FinalRating
            text={`Bewertung für ${props.name}`}
            value={props.rating}
          /> :
          <H2Progress
            name={props.name}
            role={props.role}
            progress={props.progress}
          />
        )}
      </div>
      <div className="col-xs-1 push-right pull-top-small">
        <IconButton onClick={props.onClose}>
        {/* TODO: Replace by Text Button */}
          <NavigationClose />
        </IconButton>
      </div>
    </div>
    {props.categories.map(cat =>
      <BlockSubcriteria
        key={cat.id}
        title={cat.title}
        criterias={cat.criteriaRatings}
        onRatingChanged={props.onRatingChanged}
        readonly={props.readonly}
      />
    )}
    <div className="row">
      <div className="col-xs-12">
      {/* TODO: i18n */}
        <H3Input
          id={props.id}
          name="comment"
          title="Bewertungen &amp; mögliche Verbesserungsvorschläge*:"
          value={props.comment}
          labelHint="Das Mitglied hat sich..."
          onValueChanged={props.onCommentChanged}
          readonly={props.readonly}
        />
      </div>
    </div>

    <div className="row push-top-medium">
      <div className="col-xs-6 align-right">
        <RaisedButton
          label={props.readonly ? 'Back' : 'Cancel'}
          onClick={props.onCancel}
        />
      </div>
      <div className="col-xs-6">
      {/* TODO: i18n */}
        <p className="italic small note push-left-small push-top-small">
          {!props.readonly ? 'Die Bewertungen werden automatisch gespeichert.' : ''}
        </p>
      </div>
    </div>
  </div>
);

EvaluationPage.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  role: React.PropTypes.string,
  progress: React.PropTypes.number,
  comment: React.PropTypes.string,
  categories: React.PropTypes.array.isRequired,
  isFinal: React.PropTypes.bool,
  onCommentChanged: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  rating: React.PropTypes.number,
  onCancel: React.PropTypes.func,
  onClose: React.PropTypes.func,
};

export default EvaluationPage;
