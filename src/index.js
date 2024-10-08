import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { QuizProider } from './contexts/QuizContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuizProider>
      <App />
    </QuizProider>
  </React.StrictMode>
);
