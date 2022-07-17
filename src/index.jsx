import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "./index.css";
import { ThemeProvider } from "styled-components";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Operation from "./operation/index";
import store from "./store";
import { Provider } from "react-redux";
moment.locale("zh-cn");

const theme = {
  $desktopWidth: "1160px",
  $bgColor: "#050611",
  $frountColor: "#14142B",
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter>
            <Routes path="/">
              <Route index element={<Home />}></Route>
              <Route path="/operation" element={<Operation />}></Route>
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App></App>);
