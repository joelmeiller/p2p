import React from 'react';

const Paragraph = props => (
  <p className="bold italic" >
    {props.text}
  </p>
);

Paragraph.propTypes = {
  text: React.PropTypes.string,
};

export default Paragraph;

// export { Paragraph, TEXT };
