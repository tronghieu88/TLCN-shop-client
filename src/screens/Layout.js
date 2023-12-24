import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

import Routes from "../routes/Routes";
import App from "./App";

import Loading from "./Loading";
import ChatBot from "../components/ChatBot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthMiddleWare from "../middleware/AuthMiddleWare";
import Compare from "./Compare";
import Chat from "../components/Chat";

const Layout = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer />
          <AuthMiddleWare>
            <App>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 min-h-[300px] ">
                <Routes className="min-h-[300px]" />
              </div>
              {/* <ChatBot /> */}
              {/* <Chat /> */}
              <Compare />
            </App>
          </AuthMiddleWare>

          {/* <Header />
        <Routes />
        <Footer /> */}
        </Provider>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default Layout;
