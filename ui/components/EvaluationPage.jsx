import React from 'react';

import H2Progress from './labelProgressbarHeader.jsx';
import BlockSubcriteria from './blockSubcriteria.jsx';
import H3Input from './H3Input.jsx';
import TabHeaderMember from './TabHeaderMember.jsx';

const EvaluationPage = (props) => {
  return (
    <div className="container">
      <div className="row" style={{marginBottom:30}}>
        <div className="col-xs-12">
          <TabHeaderMember
            title={props.title}
            members={props.members}
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <H2Progress
            h2titleName={props.memberName}
            h2RoleName={props.memberRole}
            progress={props.pageProgress}
            />
        </div>
      </div>
      {(() => (props.criteriaBlocks ? props.criteriaBlocks.map((criteriaBlock) =>
        <div className="row">
          <div className="col-xs-12">
            <BlockSubcriteria
              criteriaTitle={criteriaBlock.title}
              starsTotalCount={5}
              criterias={criteriaBlock.criterias}
              />
          </div>
        </div>
      ) : undefined))()}
      <div className="row">
        <div className="col-xs-12">
          <H3Input
            h3Title="Bewertungen &amp; mögliche Verbesserungsvorschläge*:"
            value={props.evalComment}
            labelHint="Das Mitglied hat sich..."
            />
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
