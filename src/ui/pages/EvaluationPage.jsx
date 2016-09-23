import React from 'react';

import H2Progress from '../components/labelProgressbarHeader.jsx';
import BlockSubcriteria from '../components/blockSubcriteria.jsx';
import H3Input from '../components/H3Input.jsx';


const EvaluationPage = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <H2Progress
          name={props.name}
          role={props.role}
          progress={props.progress}
          />
      </div>
    </div>
    {props.criteriaBlocks.map((block, i) =>
      <BlockSubcriteria
        key={`category-${i}`}
        title={block.title}
        criterias={block.criterias}
      />
    )}
    <div className="row">
      <div className="col-xs-12">
        <H3Input
          name="comment"
          title="Bewertungen &amp; mögliche Verbesserungsvorschläge*:"
          value={props.comment}
          labelHint="Das Mitglied hat sich..."
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
  criteriaBlocks: React.PropTypes.array.isRequired,
}

export default EvaluationPage;
