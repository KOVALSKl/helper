import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

// COMPONENTS
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';

// CLIENT
import SymptomsPage from './pages/SymptomsPage/SymptomsPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import HomePage from './pages/HomePage/HomePage';
import DiagnosisPage from './pages/DiagnosesPage/DiagnosesPage';

// ADMIN
import AdminPage from './pages/AdminPage/AdminPage';
import Home from './pages/AdminPage/Home/Home';

// THEMES
import { ThemeProvider } from '@emotion/react';
import { helperTheme } from './assets/themes/helperTheme';
import SymptomsGroupPage from "./pages/AdminPage/Groups/Symptoms/SymptomsGroupPage";
import DiseasesGroupPage from "./pages/AdminPage/Groups/Diseases/DiseasesGroupPage";
import RisksGroupPage from "./pages/AdminPage/Groups/Risks/RisksGroupPage";
import DiseasesPage from "./pages/AdminPage/Diseases/DiseasesPage";
import DoctorsPage from "./pages/AdminPage/Doctors/DoctorsPage";
import SymptomsCrudPage from "./pages/AdminPage/Symptoms/SymptomsCrudPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'symptoms',
        element: <SymptomsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'diagnoses',
        element: <DiagnosisPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
            errorElement: <ErrorPage />
          },
          {
            path:'disease',
            element: <DiseasesPage/>
          },
          {
            path: 'doctors',
            element: <DoctorsPage/>
          },
          {
            path: 'symptoms',
            element: <SymptomsCrudPage/>
          },
          {
            path: 'groups',
            errorElement: <ErrorPage/>,
            children: [
              {
                path: 'symptoms',
                element: <SymptomsGroupPage/>
              },
              {
                path: 'diseases',
                element: <DiseasesGroupPage/>
              },
              {
                path: 'risks',
                element: <RisksGroupPage/>
              }
            ]
          }
        ]
      }
    ]
  },
])

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <ThemeProvider theme={helperTheme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
