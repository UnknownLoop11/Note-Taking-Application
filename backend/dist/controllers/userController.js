"use strict";
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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const asyncHandler_1 = __importDefault(require("../lib/asyncHandler"));
// Models
const User_1 = __importDefault(require("../models/User"));
/** @description Get all users */
exports.getUsers = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.status(200).json(users);
}));
/** @description Get a single user */
exports.getUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user;
    const user = yield User_1.default.findOne(userId);
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }
    res.status(200).json({ success: true, user });
}));
/** @description Update a user */
exports.updateUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user;
    const user = yield User_1.default.findByIdAndUpdate(userId, {
        $set: req.body
    }, { new: true });
    res.status(200).json({ success: true, user });
}));
/** @description Delete a user */
exports.deleteUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId } = req.body.user;
    yield User_1.default.deleteOne({ _id: userId });
    res.status(200).json({ success: true, message: "User deleted successfully" });
}));
