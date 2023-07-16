"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const fi_1 = require("react-icons/fi");
require("../App.css");
const react_router_dom_1 = require("react-router-dom");
const react_auth_kit_1 = require("react-auth-kit");
const LogOut = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const signOut = (0, react_auth_kit_1.useSignOut)();
    const logout = () => {
        signOut();
        navigate("/login");
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("button", { className: "logout", onClick: logout },
            react_1.default.createElement(fi_1.FiLogOut, null))));
};
exports.default = LogOut;
