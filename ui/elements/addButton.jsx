// React Imports
import React from 'react';

// Material Imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';

//injectTapEventPlugin();

const addButton = (props) => {
  console.log(props);
  return (
      <RaisedButton
        label={props.add}
      />
  );
};

export default addButton;
