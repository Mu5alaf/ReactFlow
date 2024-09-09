import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ScraperProvider } from './components/ScraperContext'; // Import ScraperProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScraperProvider> {}
      <App />
    </ScraperProvider>
  </React.StrictMode>
);
