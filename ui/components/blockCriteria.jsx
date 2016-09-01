//React Imports
import React from 'react';

//Material Imports
import Header2_line from '../elements/Header/Header2_line.jsx';
import CriteriaStars from './criteriaStars.jsx';

const BlockCriteria = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <Header2_line
              myTitle={props.criteriaTitle}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12"><CriteriaStars
              textCriteria={props.criteriaText}
              starsTotalCount={props.criteriaTotalCount}
              valueEffective={props.criteriaEffective}
              />
            </div>
          </div>
        </div>
      );
};

export default BlockCriteria;
