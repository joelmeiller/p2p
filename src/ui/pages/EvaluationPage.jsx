import React from 'react';

import H2Progress from '../components/labelProgressbarHeader.jsx';
import BlockSubcriteria from '../components/BlockSubcriteria.jsx';
import H3Input from '../components/H3Input.jsx';


const EvaluationPage = props => (
  <div className="container push-top">
    <div className="row">
      <div className="col-xs-12">
        <H2Progress
          name={props.name}
          role={props.role}
          progress={props.progress}
        />
      </div>
    </div>
    {props.categories.map(cat =>
      <BlockSubcriteria
        key={cat.id}
        title={cat.title}
        criterias={cat.criterias}
        onRatingChanged={props.onRatingChanged}
      />
    )}
    <div className="row">
      <div className="col-xs-12">
        <H3Input
          id={props.id}
          name="comment"
          title="Bewertungen &amp; mögliche Verbesserungsvorschläge*:"
          defaultValue={props.comment}
          labelHint="Das Mitglied hat sich..."
          onValueChanged={props.onCommentChanged}
        />
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
  onRatingChanged: React.PropTypes.func,
};

export default EvaluationPage;
