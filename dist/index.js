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
const mustache_1 = require("mustache");
const upper = (input) => {
    return input.trim().replace(/^\w/, (c) => c.toUpperCase());
};
const lower = (input) => {
    return input.trim().replace(/^\w/, (c) => c.toLowerCase());
};
module.exports = {
    plugin: (_, documents) => __awaiter(void 0, void 0, void 0, function* () {
        const queryOptions = yield util_1.promisify(fs_1.readFile)(__dirname + '/templates/queryOption.mustache', { encoding: "utf-8" });
        const mutationOptions = yield util_1.promisify(fs_1.readFile)(__dirname + '/templates/mutationOptions.mustache', { encoding: "utf-8" });
        yield util_1.promisify(fs_1.writeFile)("./output.json", JSON.stringify(documents));
        const fileSegments = ["//THIS IS A GENERATED FILE, DO NOT MODIFY. YOUR CHANGES WILL BE REWRITTEN ON NEW GENERATION", `//Generated at ${new Date()}`, `import 'package:graphql_flutter/graphql_flutter.dart';`];
        for (let index = 0; index < documents.length; index++) {
            const element = documents[index];
            const definition = element.document.definitions[0]; // Currently supporting only 1 definition per document
            const documentBody = (yield util_1.promisify(fs_1.readFile)(element.location, { encoding: "utf-8" })).replace(/\$/g, "\\$").trim();
            if (definition.operation === 'mutation') {
                const segment = `${mustache_1.render(mutationOptions, { variableName: lower(definition.name.value), className: upper(definition.name.value), documentBody })}`;
                fileSegments.push(segment);
            }
            if (definition.operation === 'query') {
                const segment = `${mustache_1.render(queryOptions, { variableName: lower(definition.name.value), className: upper(definition.name.value), documentBody })}`;
                fileSegments.push(segment);
            }
        }
        return fileSegments.join('\n');
    }),
    validate: (_, __, ___, outputFile) => {
        if (!outputFile.match(/\.dart$/)) {
            throw new Error(`Plugin "graphql_flutter" requires extention to be ".dart"`);
        }
    }
};
