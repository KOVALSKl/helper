import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SymptomsPage from './pages/SymptomsPage/SymptomsPage';
import DiseasesPage from './pages/DiseasesPage/DiseasesPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/symptoms',
    element: <SymptomsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/diseases',
    element: <DiseasesPage />
  }
])

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
