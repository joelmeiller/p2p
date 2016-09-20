import React from 'react';

import H2Progress from './labelProgressbarHeader.jsx';
import BlockSubcriteria from './blockSubcriteria.jsx';
import H3Input from './H3Input.jsx';

const EvaluationPage = (props) => {
  return (
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
      {(() => (props.criteriaBlocks ? props.criteriaBlocks.map((block) =>
        <div className="row">
          <div className="col-xs-12">
            <BlockSubcriteria
              title={block.title}
              criterias={block.criterias}
              />
          </div>
        </div>
      ) : undefined))()}
      <div className="row">
        <div className="col-xs-12">
          <H3Input
            title="Bewertungen &amp; mögliche Verbesserungsvorschläge*:"
            value={props.comment}
            labelHint="Das Mitglied hat sich..."
            />
        </div>
      </div>
    </div>
  );
};

EvaluationPage.propTypes = {
  name: React.PropTypes.string,
  role: React.PropTypes.string,
  progress: React.PropTypes.number,
  comment: React.PropTypes.string,
  criteriaBlocks: React.PropTypes.array,
}

export default EvaluationPage;
