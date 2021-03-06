import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CustomRouter from './customRouter';
import { createBrowserHistory } from 'history';
import {Provider} from "react-redux";
import {persistor, store} from "./redux/configureStore";
import {PersistGate} from "redux-persist/integration/react"
import GlobalStyle from './styles/GlobalStyle';

const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle/>
      <PersistGate loading={null} persistor={persistor}>
        <CustomRouter history={history}>
          <App />
        </CustomRouter>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export default history;
reportWebVitals();
