//React Imports
import React from 'react';

//Material Imports
import Header2_line from '../elements/Header/Header2_line.jsx';
import CriteriaStars from './criteriaStars.jsx';

const BlockSubcriteria = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Header2_line
              myTitle={props.criteriaTitle}
              />
            </div>
          </div>
          {(() => (props.criterias ? props.criterias.map((criteria) =>
            <div className="row">
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
};

export default BlockSubcriteria;
