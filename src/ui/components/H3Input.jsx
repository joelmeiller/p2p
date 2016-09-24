// React Imports
import React from 'react';

// Material Imports
import TextField from 'material-ui/TextField';

// Local imports
import Header3 from '../elements/Header/Header3.jsx';


const H3Input = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-xs-12 h3-padding">
        <Header3
          myTitle={props.title}
        />
      </div>
      <div className="col-xs-12 h3-line-width">
        <TextField
          defaultValue={props.defaultValue}
          fullWidth
          hintText={props.hintText}
          name={props.name}
          onChange={(e) => props.onValueChanged(e.target.value)}
          value={props.value}
          multiLine={true}
          rows={3}
        />
      </div>
    </div>
  </div>
);

H3Input.propTypes = {
  hintText: React.PropTypes.string,
  name: React.PropTypes.string,
  onValueChanged: React.PropTypes.func,
  title: React.PropTypes.string,
  value: React.PropTypes.string,
};

export default H3Input;
