//React Imports
import React from 'react';

//Material Imports
import FontIcon from 'material-ui/FontIcon';

const UserMenu = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-1">
                <FontIcon className="material-icons" style={{color: '00bcd4'}}>assessment</FontIcon>
              </div>
            <div className="col-xs-11 margin-topAndleft blue"><p>
                {props.firstLabel}</p></div>
          </div>
          <div className="row">
            <div className="col-xs-1">
                <FontIcon className="material-icons">grade</FontIcon>
              </div>
            <div className="col-xs-11 margin-topAndleft"><p>
                {props.secondLabel}</p></div>
          </div>
          <div className="row">
            <div className="col-xs-1">
                <FontIcon className="material-icons">account_box</FontIcon>
              </div>
            <div className="col-xs-11 margin-topAndleft blue"><p>
                {props.thirdLabel}</p></div>
          </div>
          <div className="row">
            <div className="col-xs-1">
                <FontIcon className="material-icons blue">eject</FontIcon>
              </div>
            <div className="col-xs-11 margin-topAndleft blue"><p>
                {props.fourthLabel}</p></div>
          </div>
        </div>
      );
};

export default UserMenu;
