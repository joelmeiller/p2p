import React from 'react';

import Paragraph from './paragraph.jsx';

const TextBlock = (props) => (
  <div
    className="label"
    name={props.name}
    id={props.id}
  >
    <h1
      id={`${props.id}-title`}
    >{props.title}
    </h1>
    <Paragraph
      text={props.text}
    />
  </div>
);

TextBlock.propTypes = {
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  title: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default TextBlock;
