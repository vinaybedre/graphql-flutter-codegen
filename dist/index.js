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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const path_1 = require("path");
module.exports = {
    plugin: (_, documents) => __awaiter(void 0, void 0, void 0, function* () {
        const strs = ["//THIS IS A GENERATED FILE, DO NOT MODIFY. YOUR CHANGES WILL BE REWRITTEN ON NEW GENERATION", `//Generated at ${new Date()}`, ""];
        for (let index = 0; index < documents.length; index++) {
            const element = documents[index];
            const fileContents = yield util_1.promisify(fs_1.readFile)(element.location, { encoding: "utf-8" });
            const extension = path_1.extname(element.location);
            const str = `String ${path_1.basename(element.location, extension)} = """
            ${fileContents.replace(/\$/g, "\\$").trim()}
            """;\n\n`;
            strs.push(str);
        }
        return strs.join('\n');
    }),
    validate: (_, __, ___, outputFile) => {
        if (!outputFile.match(/\.dart$/)) {
            throw new Error(`Plugin "graphql_flutter" requires extention to be ".dart"`);
        }
    }
};
