import React from 'react';

import Header2Line from '../elements/Header/Header2Line.jsx';
import CriteriaStars from './criteriaStars.jsx';

const BlockSubcriteria = (props) => (
  <div className="container" key={`category-${props.index}`}>
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
        myTitle={props.title}
        />
      </div>
    </div>
    {(() => (props.criterias ? props.criterias.forEach((criteria, index) =>
      <div className="row" key={`criteria-${index}`}>
        <div className="col-xs-12">
          <CriteriaStars
            textCriteria={criteria.label}
            valueEffective={criteria.stars}
            />
        </div>
      </div>
    ) : undefined))()}
  </div>
);

BlockSubcriteria.propTypes = {
  index: React.PropTypes.number,
  title: React.PropTypes.string,
  criterias: React.PropTypes.array,
}

export default BlockSubcriteria;
