import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Root from "./routes/root";
import Authentication from './pages/authentication';
import ErrorPage from './pages/error-page';
import MyAppointments from './pages/myAppointments';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/my-appointments",
        element: <MyAppointments/>
      },
    ]
  },
  {
    path: "/auth",
    element:<Authentication/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
