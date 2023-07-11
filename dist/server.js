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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const bcrypt = __importStar(require("bcrypt"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const secretKey = "your_secret_key";
const uri = process.env.MONGO_URI;
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send(uri);
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    const { email, password } = req.body;
    const generatedUserId = (0, uuid_1.v4)();
    const hashedPassword = yield bcrypt.hash(password, 10);
    try {
        yield client.connect();
        const database = client.db("registered");
        const users = database.collection("users");
        const existingUser = yield users.findOne({ email });
        if (existingUser) {
            return res.status(409).send("User already exists. Please login");
        }
        const sanitizedEmail = email.toLowerCase();
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashed_password: hashedPassword,
            tasks: []
        };
        const insertedUser = yield users.insertOne(data);
        const token = jsonwebtoken_1.default.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        });
        res
            .status(201)
            .json({ token, userId: generatedUserId, status: "inserted" });
    }
    catch (err) {
        console.log(err);
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    const { email, password } = req.body;
    try {
        yield client.connect();
        const database = client.db("registered");
        const users = database.collection("users");
        const user = yield users.findOne({ email });
        console.log(user);
        const correctPassword = yield bcrypt.compare(password, user.hashed_password);
        if (user && correctPassword) {
            const token = jsonwebtoken_1.default.sign(user, email, {
                expiresIn: 60 * 24,
            });
            res.status(201).json({ token, userId: user.user_id });
        }
        else {
            res.status(400).json("Invalid Credentials");
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        yield client.close();
    }
}));
app.post("/addtask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    const { email, task, isDone } = req.body;
    try {
        yield client.connect();
        const database = client.db("registered");
        const users = database.collection("users");
        const response = yield users
            .updateOne({ email: email }, { $push: { tasks: { task, isDone } } })
            .then(() => {
            res.send("request completed");
        });
        console.log(response);
    }
    catch (err) {
        res.send(err);
    }
}));
app.get("/getTasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body;
    const client = new mongodb_1.MongoClient(uri);
    try {
        yield client.connect();
        const database = client.db("registered");
        const users = database.collection("users");
        const user = yield users.findOne({ email });
        const tasks = user.tasks;
        res.send(tasks);
    }
    catch (err) {
        res.send("error");
    }
}));
app.post("/deleteTask", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(uri);
    const { email, toDelete } = req.body;
    try {
        yield client.connect();
        const database = client.db("registered");
        const users = database.collection("users");
        const user = yield users.findOne({ email });
        const taskList = user.tasks;
        console.log(taskList);
        yield users
            .updateOne({ email: email }, { $pull: { tasks: { task: toDelete } } })
            .then(() => res.send("task deleted"));
    }
    catch (err) {
        res.send(err);
    }
}));
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map