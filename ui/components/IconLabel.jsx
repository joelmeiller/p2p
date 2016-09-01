//React Imports
import React from 'react';

//Material Imports
import FontIcon from 'material-ui/FontIcon';

const IconLabel = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-1">
                <FontIcon className="material-icons blue">dashboard</FontIcon>
              </div>
            <div className="col-xs-11 margin-topAndleft"><p>
                {props.labelMenu}</p></div>
          </div>
        </div>
      );
};

export default IconLabel;
