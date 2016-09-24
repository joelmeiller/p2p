import React from 'react';

import LabeledStarRating from '../elements/LabeledStarRating.jsx';

import Header2Line from '../elements/Header/Header2Line.jsx';


const BlockSubcriteria = (props) => (
  <div className="container" >
    <div className="row">
      <div className="col-xs-12">
        <Header2Line
        myTitle={props.title}
        />
      </div>
    </div>
    {(() => (props.criterias ? props.criterias.map((criteria) =>
      <div className="row" key={criteria.id}>
        <div className="col-xs-12">
          <LabeledStarRating
            value={criteria.stars}
            onRatingChanged={props.onRatingChanged}
            {...criteria}
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
  onRatingChanged: React.PropTypes.func,
}

export default BlockSubcriteria;
