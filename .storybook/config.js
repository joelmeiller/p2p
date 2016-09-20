import { configure } from '@kadira/storybook';

import '../src/ui/styles/import.css';


const req = require.context('../src/ui/', true, /\.story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
