import React from "react";
import "./index.css";
import "./stylesheets/index.css";
import "antd/dist/antd.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
// import { SnackbarProvider } from "notistack";
import { LanguageProvider } from "./utils/localization/localContext/LocalContext";
import { persistStore } from "redux-persist";
import { ThemeStore } from "./utils/contextApi/directionContexApi";
import Theme from "./utils/contextApi/directionContexApi/theme";
import { injectStore } from "./utils/services/AxiosConfig";
import { injectStore as InjectAuthConfigStore } from "./utils/services/AuthConfig";
import { injectStore as InjectMessengerConfigStore } from "./utils/services/MessengerConfig";
import { injectStore as InjectMasterConfigStore } from "./utils/services/MasterConfig";

import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
// let persistor = persistStore(store);
const onBeforeLift = () => {};

injectStore(store);
InjectAuthConfigStore(store);
InjectMasterConfigStore(store);
InjectMessengerConfigStore(store);
root.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      onBeforeLift={onBeforeLift}
      persistor={persistor}
    >
      <LanguageProvider>
        <ThemeStore>
          <Theme>
            {/* <SnackbarProvider
							maxSnack={12}
							dense={true}
							// content={(key, notification) => <MySnackBar id={key} notification={notification}/>}
						>
						</SnackbarProvider> */}
            <App />
          </Theme>
        </ThemeStore>
      </LanguageProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// reportWebVitals();
