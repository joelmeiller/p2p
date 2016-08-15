//React Imports
import React from 'react';

//Material Imports
import InputMichelle from '../elements/inputfield.jsx';
import DropdownMichelle from '../elements/dropdown.jsx';

const NameMailRole = (props) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-4"><InputMichelle
              hintText={props.hintName}
              defaultValue={props.textName}/>
            </div>
            <div className="col-xs-4"><InputMichelle
              hintText={props.hintMail}
              defaultValue={props.textMail}/>
            </div>
            <div className="col-xs-4">  <DropdownMichelle
                selectedValue="test_1"
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
          </div>
        </div>
      );
};

export default NameMailRole;
