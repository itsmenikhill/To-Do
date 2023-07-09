"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const Dashboard_1 = __importDefault(require("./Pages/Dashboard"));
const Login_1 = __importDefault(require("./Pages/Login"));
const react_router_dom_1 = require("react-router-dom");
const react_auth_kit_1 = require("react-auth-kit");
const SignIn_1 = __importDefault(require("./Pages/SignIn"));
const App = () => {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(react_auth_kit_1.AuthProvider, { authType: "cookie", authName: "_auth", cookieDomain: window.location.hostname, cookieSecure: false },
            react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
                react_1.default.createElement(react_router_dom_1.Routes, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Login_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(Login_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/signin", element: react_1.default.createElement(SignIn_1.default, null) }),
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1.default.createElement(react_auth_kit_1.RequireAuth, { loginPath: "/login" },
                            react_1.default.createElement(Dashboard_1.default, null)) }))))));
};
exports.default = App;
