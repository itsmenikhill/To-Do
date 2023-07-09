"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("../App.css");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const react_auth_kit_1 = require("react-auth-kit");
const SignIn = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const signIn = (0, react_auth_kit_1.useSignIn)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [name, setName] = (0, react_1.useState)("");
    const handleSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios_1.default.post("http://localhost:8000/signup", values);
        try {
            if (signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: values.email },
            }))
                navigate("/dashboard", { state: { email: email } });
        }
        catch (err) {
            if (err) {
                console.log(err);
            }
        }
    });
    const handleChange = (event) => {
        console.log(event.target.value);
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }
        else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
        else {
            setName(event.target.value);
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "login-container" },
                react_1.default.createElement("h2", { className: "form-heading" }, "Sign Up"),
                react_1.default.createElement("form", { className: "form-container", onSubmit: () => handleSubmit({ email, password }) },
                    react_1.default.createElement("input", { type: "text", placeholder: "Your name", name: "name", onChange: handleChange }),
                    react_1.default.createElement("input", { type: "text", placeholder: "Your email", name: "email", onChange: handleChange }),
                    react_1.default.createElement("input", { type: "password", placeholder: "Enter Password", name: "password", onChange: handleChange }),
                    react_1.default.createElement("button", { className: "form-button" }, "Create Account"))))));
};
exports.default = SignIn;
