import React from 'react';


const App = (props) => (
  <div className="app">
    <nav>
      Header
    </nav>
    <main>
      {props.children}
    </main>
  </div>
);

App.propTypes = {
  children: React.PropType.node,
};

export default App;
