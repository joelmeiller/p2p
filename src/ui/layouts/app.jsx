import React from 'react';


const App = (props) => (
  <div className="app">
    <nav>
      <h1>Header</h1>
    </nav>
    <main>
      {props.children}
    </main>
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
