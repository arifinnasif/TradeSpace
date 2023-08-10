import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import custom_theme from "./utils/theme.ts";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

// 2. Extend the theme to include custom colors, fonts, etc

const theme = extendTheme({ custom_theme });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
