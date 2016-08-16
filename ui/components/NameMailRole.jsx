//React Imports
import React from 'react';

//Material Imports
import InputMichelle from '../elements/inputfield.jsx';
import DropdownMichelle from '../elements/dropdown.jsx';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  marginTop: {
    margin-top:-8,
  },
};

const NameMailRole = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-2"><InputMichelle
              hintText={props.hintName}
              defaultValue={props.textName}/>
            </div>
            <div className="col-xs-2"><InputMichelle
              hintText={props.hintMail}
              defaultValue={props.textMail}/>
            </div>
            <div className="col-xs-2"><DropdownMichelle
              style={styles.marginTop}
              selectedValue="Role"
                menuItems={[
                  {
                    label: 'Quality Manager',
                    value: 'QM',
                  },
                  {
                    label: 'TEC Leader',
                    value: 'TEC',
                  },
                  {
                    label: 'Requirements Engineer',
                    value: 'REQ',
                  },
                  {
                    label: 'Usability Manager',
                    value: 'UM',
                  },
                  {
                    label: 'Information Manager',
                    value: 'IM',
                  },
                  {
                    label: 'Test Manager',
                    value: 'Test',
                  },
                ]}
                onChange={() => console.log('Changed to')}
              />
            </div>
            <div className="col-xs-2"><a href="url">add Role</a>
            </div>
            <div className="col-xs-2">
              <FontIcon className="material-icons">edit</FontIcon>
            </div>
            <div className="col-xs-2">
              <FontIcon className="material-icons">delete</FontIcon>
            </div>
          </div>
        </div>
      );
};

export default NameMailRole;
