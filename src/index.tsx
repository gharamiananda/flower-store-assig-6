import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App";
import { Provider } from "react-redux";
import { store ,persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from "react";
import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer, toast } = createStandaloneToast()

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
<BrowserRouter>
  <Suspense>
    <App />

    <ToastContainer  />
    {/* <Toaster   position="top-right"/> */}
  </Suspense>
</BrowserRouter>
</PersistGate>
</Provider>
);




