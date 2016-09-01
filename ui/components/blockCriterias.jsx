//React Imports
import React from 'react';

//Material Imports
import BlockSubcriteria from './blockSubcriteria.jsx';

const BlockCriterias = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <BlockSubcriteria
              criteriaTitle={props.criteriaTitle1}
              criteriaText={props.criteriaText11}
              criteriaTotalCount={props.criteriaTotalCount11}
              criteriaEffective={props.criteriaEffective11}
              criteriaText2={props.criteriaText12}
              criteriaTotalCount2={props.criteriaTotalCount12}
              criteriaEffective2={props.criteriaEffective12}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <BlockSubcriteria
              criteriaTitle={props.criteriaTitle2}
              criteriaText={props.criteriaText21}
              criteriaTotalCount={props.criteriaTotalCount21}
              criteriaEffective={props.criteriaEffective21}
              criteriaText2={props.criteriaText22}
              criteriaTotalCount2={props.criteriaTotalCount22}
              criteriaEffective2={props.criteriaEffective22}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <BlockSubcriteria
              criteriaTitle={props.criteriaTitle3}
              criteriaText={props.criteriaText31}
              criteriaTotalCount={props.criteriaTotalCount31}
              criteriaEffective={props.criteriaEffective31}
              criteriaText2={props.criteriaText32}
              criteriaTotalCount2={props.criteriaTotalCount32}
              criteriaEffective2={props.criteriaEffective32}
              />
            </div>
          </div>
        </div>
      );
};

export default BlockCriterias;
