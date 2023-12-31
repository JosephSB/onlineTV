import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter as Router, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import AppRouter from './routes';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router basename="/">
        <AppRouter />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
