"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //express is used to create the server
const dotenv_1 = __importDefault(require("dotenv")); //dotenv is used for managing enviorment variables
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
console.log('MONGO_URI:', process.env.MONGO_URI);
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001; //PORT 5000 is being used by Mac
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('StudentSwap Backend is running!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
