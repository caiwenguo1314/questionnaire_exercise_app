import PageLayout from "components/layout/PageLayout";
import BankInfo from "pages/BankInfo";
import ErrorPage from "pages/ErrorPage";
import Home from "pages/Home";
import PolicySelect from "pages/PolicySelect";
import QuestionnaireForm from "pages/QuestionnaireForm";
import Review from "pages/Review";
import { createBrowserRouter } from "react-router-dom";
import Root from "../context/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <PageLayout />,
        errorElement: <ErrorPage />,
      },
      // {
      //   path: "/form",
      //   element: <PageLayout />,
      //   errorElement: <ErrorPage />,
      //   children: [
      //     {
      //       path: "/form/policySelect",
      //       element: <PolicySelect />,
      //     },
      //     {
      //       path: "/form/questionnaire",
      //       element: <QuestionnaireForm />,
      //     },
      //     {
      //       path: "/form/bankInfo",
      //       element: <BankInfo />,
      //     },
      //     {
      //       path: "/form/review",
      //       element: <Review />,
      //     },
      //   ],
      // },
    ],
  },
]);
