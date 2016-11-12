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
        {(props.rating ?
          <FinalRating
            text={`Rating for ${props.name} is`}
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
        <IconButton onClick={() => props.onClose(props)}>
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
          onClick={props.handleCancel}
        />
      </div>
      <div className="col-xs-6">
        <p className="italic small note push-left-small push-top-small">
          {props.readonly ? 'Die Bewertungen werden automatisch gespeichert.' : ''}
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
  onCommentChanged: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  rating: React.PropTypes.number,
  handleCancel: React.PropTypes.func,
};

export default EvaluationPage;
