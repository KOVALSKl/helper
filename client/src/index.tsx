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
import AdminPage from './pages/AdminPage/AdminPage';
import DiseaseAddPage from './pages/AdminPage/DiseaseAddPage/DiseaseAddPage';
import SymptomAddPage from './pages/AdminPage/SymptomAddPage/SymptomAddPage';
import HomeAdminPage from './pages/AdminPage/HomeAdminPage/HomeAdminPage';
import GroupAddPage from './pages/AdminPage/GroupAddPage/GroupAddPage';

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
      },
      {
        path: '/admin',
        element: <AdminPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/admin',
            element: <HomeAdminPage />,
            errorElement: <ErrorPage />
          },
          {
            path: '/admin/disease',
            element: <DiseaseAddPage />,
            errorElement: <ErrorPage />
          },
          {
            path: '/admin/symptom',
            element: <SymptomAddPage />,
            errorElement: <ErrorPage />
          },
          {
            path: '/admin/group',
            element: <GroupAddPage />,
            errorElement: <ErrorPage />
          },
        ]
      }
    ]
  },
])

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
