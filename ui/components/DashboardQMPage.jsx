import React from 'react';

import LabelStarsDB from './LabelStarsDB.jsx';
import TextButton from '../elements/Button/TextButton.jsx';
import AppBarHeader from './AppBarHeader.jsx';


const DashboardQMPage = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <AppBarHeader
            title="IP4: KLAV"
            />
        </div>
        </div>
        {(() => (props.entries ? props.entries.map((entry) =>
          <div className="row">
            <div className="col-xs-12">
              <LabelStarsDB
                text={entry.name + ', ' + entry.role}
                stars={entry.stars}
                deviation={entry.deviation}
                grade={entry.grade}
                status={entry.status}
                />
            </div>
          </div>
        ) : undefined))()}
        <div className="row">
          <div className="col-xs-12" style={{marginTop:10}}>
            <TextButton
              text={props.text}
              />
          </div>
        </div>
      </div>
    );
  };

  export default DashboardQMPage;
