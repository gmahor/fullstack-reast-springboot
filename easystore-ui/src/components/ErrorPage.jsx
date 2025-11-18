import { Link, useRouteError } from "react-router-dom";
import errorImage from "../assets/util/error.png";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { PageTitle } from "./page/PageTitle";

export const ErrorPage = () => {
  const routeError = useRouteError();
  let errorTitle = "Oops! Something went wrong";
  let errorMessage = "An unexpected error occurred. Please try again later.";
  if (routeError) {
    errorTitle = routeError.status;
    errorMessage = routeError.data;
  }
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-12 bg-normalbg dark:bg-darkbg font-primary">
          <div className="max-w-4xl mx-auto px-4">
            <PageTitle title={errorTitle} />
          </div>
          <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
            <p className="max-w-[576px] px-2 mx-auto leading-6 mb-4">
              {errorMessage}
            </p>
            <img
              src={errorImage}
              alt="Error"
              className="w-full max-w-[200px] mx-auto mb-6"
            />
            <Link
              to="/home"
              className="py-3 px-6 text-white dark:text-black text-xl rounded-md transition duration-200 bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
