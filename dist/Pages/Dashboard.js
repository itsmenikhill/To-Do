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
const TodoTask_1 = __importDefault(require("../Components/TodoTask"));
const fa_1 = require("react-icons/fa");
const LogOut_1 = __importDefault(require("../Components/LogOut"));
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const Dashboard = () => {
    const [task, setTask] = (0, react_1.useState)("");
    const [todoList, setTodoList] = (0, react_1.useState)([]);
    const isDone = false;
    const location = (0, react_router_dom_1.useLocation)();
    const email = location.state.email;
    // on load of this Dashboard component, call api to get all tasks from db
    // and set it as todolist
    // on addTask call, set the todolist and insert the item in the db as well
    // same when task is deleted
    (0, react_1.useEffect)(() => {
        onLoad(email);
    }, []);
    const onLoad = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const tasks = yield axios_1.default.get("http://localhost:8000/gettasks", email);
        const newItaskArr = [];
        // getting the items from the response and converting in a ITask array and setting the todolist
        for (let i = 0; i < tasks.data.length; i++) {
            const taskName = tasks.data[i].task;
            const isDone = tasks.data[i].isDone;
            const newTask = { taskName, isDone };
            newItaskArr.unshift(newTask);
        }
        setTodoList(newItaskArr);
    });
    const handleChange = (event) => {
        if (event.target.name === "name") {
            setTask(event.target.value);
        }
    };
    const addTask = (value) => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = { taskName: value.task, isDone: value.isDone };
        if (value.task !== "") {
            setTodoList([newTask, ...todoList]);
            yield axios_1.default.post("http://localhost:8000/addtask", value);
            setTask("");
        }
    });
    const completeTask = (taskToDelete) => {
        setTodoList(todoList.filter((task) => {
            return task.taskName !== taskToDelete;
        }));
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement("div", { className: "logout-app" },
                react_1.default.createElement(LogOut_1.default, null)),
            react_1.default.createElement("div", { className: "app-container" },
                react_1.default.createElement("div", { className: "header" },
                    react_1.default.createElement("h2", { className: "app-heading" }, "ToDo List"),
                    react_1.default.createElement("div", { className: "input-container" },
                        react_1.default.createElement("input", { type: "text", placeholder: "Add your task here", name: "name", value: task, onChange: handleChange }),
                        react_1.default.createElement("button", { onClick: () => {
                                addTask({ email, task, isDone });
                            } },
                            react_1.default.createElement(fa_1.FaPlus, null)))),
                react_1.default.createElement("div", { className: "task-container" },
                    react_1.default.createElement("div", { className: "todolist" }, todoList.map((task, key) => {
                        return (react_1.default.createElement(TodoTask_1.default, { key: key, task: task, completeTask: completeTask }));
                    })))))));
};
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map