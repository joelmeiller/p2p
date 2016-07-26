import { configure } from '@kadira/storybook';

import '../ui/style/import.css';


const req = require.context('../ui/', true, /\.story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
