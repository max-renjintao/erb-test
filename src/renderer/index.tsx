import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from './store/Store';
import Theme from './theme/Theme';

const container = document.getElementById('root')!;
const root = createRoot(container);
console.log('<index>');

root.render(
  <Store>
    <Theme>
      <App />
    </Theme>
  </Store>
);
