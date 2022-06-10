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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_token = void 0;
require("dotenv/config");
const sqlite3 = __importStar(require("sqlite3"));
const ethereumjs_util_1 = require("ethereumjs-util");
const ethers_1 = require("ethers");
const db = new sqlite3.Database('./database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS token (address TEXT PRIMARY KEY, token STRING)");
const pk = process.env.PRIVATE_KEY || "";
const Buffer_pk = Buffer.from(pk, 'hex');
const create_token = function main(address, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const new_token_address = ethers_1.ethers.utils.getAddress(address);
            const hashBuffer = yield generateHashBuffer(["address"], [new_token_address]);
            const signed_token = yield (0, ethereumjs_util_1.ecsign)(hashBuffer, Buffer_pk);
            const hex_token = {
                r: (0, ethereumjs_util_1.bufferToHex)(signed_token.r),
                s: (0, ethereumjs_util_1.bufferToHex)(signed_token.s),
                v: signed_token.v
            };
            db.run("INSERT INTO token VALUES (?,?)", address, JSON.stringify(hex_token), function (err, response) {
                if (err) {
                    res.status(400).send({ error: "Address already whitelisted" });
                    console.log("already whitelisted");
                }
                else {
                    res.status(200).send({ message: "address is now whitelisted" });
                }
            });
        }
        catch (e) {
            throw Error(e);
        }
    });
};
exports.create_token = create_token;
function generateHashBuffer(types, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield (0, ethereumjs_util_1.keccak256)((0, ethereumjs_util_1.toBuffer)(ethers_1.ethers.utils.defaultAbiCoder.encode(types, values)));
        return buffer;
    });
}
