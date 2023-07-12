import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Q1 from './pages/q1';
import Q2 from './pages/q2';
import Q3 from './pages/q3';
import Q4 from './pages/q4';
import Q5 from './pages/q5';
import Q6 from './pages/q6';
import Q7 from './pages/q7';
import Q8 from './pages/q8';
import End from './pages/end';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Q1",
    element: <Q1 />,
  },
  {
    path: "Q2",
    element: <Q2 />,
  },
  {
    path: "Q3",
    element: <Q3 />,
  },
  {
    path: "Q4",
    element: <Q4 />,
  },
  {
    path: "Q5",
    element: <Q5 />,
  },
  {
    path: "Q6",
    element: <Q6 />,
  },
  {
    path: "Q7",
    element: <Q7 />,
  },
  {
    path: "Q8",
    element: <Q8 />,
  },
  {
    path: "end",
    element: <End />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
