"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const token_1 = require("./route/token");
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/token', token_1.TokenRouter);
app.listen(port, () => {
    console.log(`Administrator listening at http://localhost:${port}`);
});
