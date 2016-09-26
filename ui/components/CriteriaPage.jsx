import React from 'react';

import Header3_line from '../elements/Header/Header3_line.jsx';
import LabelCheckbox from './labelCheckbox.jsx';
import TabHeaderMember from './TabHeaderMember.jsx';
import AddCriteria from './AddCriteria.jsx';

const CriteriaPage = (props) => {
  return (
    <div className="container">
      <div className="row" style={{marginBottom:30}}>
        <div className="col-xs-12">
          <TabHeaderMember
            title={props.title}
            value="Kommunikative"
            members={props.criteriaBlocks}
            />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <Header3_line
            myTitle={props.myTitle}
            />
        </div>
      </div>
      {(() => (props.criterias ? props.criterias.map((criteria) =>
      <div className="row">
        <div className="col-xs-12">
          <LabelCheckbox
            text={criteria.text}
            />
        </div>
      </div>
    ) : undefined))()}
    <div className="row" style={{marginBottom:30}}>
      <div className="col-xs-12">
        <AddCriteria
          hintText="Criteria"
          />
      </div>
    </div>
    </div>
  );
};

export default CriteriaPage;
