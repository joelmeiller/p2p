import React from 'react';

import FontIcon from 'material-ui/FontIcon';
import {blue500} from 'material-ui/styles/colors';

const IconLabel = props => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-1">
                <FontIcon className="material-icons" color={blue500}>dashboard</FontIcon>
              </div>
            <div className="col-xs-11 margin-topAndleft"><p>
                {props.labelMenu}</p></div>
          </div>
        </div>
      );
};

export default IconLabel;
