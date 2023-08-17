import './scss/styles.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App/App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('app'));

root.render(
  <StrictMode>
    <Router>
        <App />
    </Router>
  </StrictMode>
)