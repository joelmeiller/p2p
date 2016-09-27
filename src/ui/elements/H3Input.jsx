// React Imports
import React from 'react';

// Material Imports
import TextField from 'material-ui/TextField';

// Local imports
import Header3 from './Header/Header3.jsx';


const H3Input = props => (
  <div className="container" key={props.id}>
    <div className="row">
      <div className="col-xs-12 h3-padding">
        <Header3
          title={props.title}
        />
      </div>
      <div className="col-xs-12 h3-line-width">
        <TextField
          defaultValue={props.value}
          fullWidth
          hintText={props.hintText}
          name={props.name}
          onChange={e => props.onValueChanged(e.target.value)}
          disabled={props.readonly}
          inputStyle={{ color: '#333333' }}
        />
      </div>
    </div>
  </div>
);

H3Input.propTypes = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  hintText: React.PropTypes.string,
  onValueChanged: React.PropTypes.func,
  title: React.PropTypes.string,
  value: React.PropTypes.string,
  readonly: React.PropTypes.bool,
};

export default H3Input;
