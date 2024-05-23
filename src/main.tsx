import React from 'react'
import App from './App.tsx'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ViewMessages from './pages/viewMessages.tsx';
import AskQuestiong from './pages/askQuestion';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/ViewMessages",
    element: <ViewMessages></ViewMessages>
  },
  {
    path: "/ask",
    element: <AskQuestiong></AskQuestiong>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
