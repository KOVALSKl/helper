import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SymptomsPage from './pages/SymptomsPage/SymptomsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomePage from './pages/HomePage/HomePage';
import DiagnosisPage from './pages/DiagnosesPage/DiagnosesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/symptoms',
        element: <SymptomsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/diagnoses',
        element: <DiagnosisPage />,
        errorElement: <ErrorPage />,
      }
    ]
  },
])

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
