import { DocumentNode, OperationDefinitionNode } from "graphql";
import { readFile,writeFile } from 'fs';
import { promisify } from 'util'
import { render as mustacheRender } from 'mustache';

interface Documents {
    location: string;
    document: DocumentNode
}

const upper = (input: string) => {
    return input.trim().replace(/^\w/, (c) => c.toUpperCase())
}

const lower = (input: string) => {
    return input.trim().replace(/^\w/, (c) => c.toLowerCase())
}

module.exports = {
    plugin: async (_, documents: Documents[]) => {
        const queryOptions = await promisify(readFile)(__dirname + '/templates/queryOption.mustache', { encoding: "utf-8" })
        const mutationOptions = await promisify(readFile)(__dirname + '/templates/mutationOptions.mustache', { encoding: "utf-8" })
        await promisify(writeFile)("./output.json",JSON.stringify(documents))
        const fileSegments = ["//THIS IS A GENERATED FILE, DO NOT MODIFY. YOUR CHANGES WILL BE REWRITTEN ON NEW GENERATION", `//Generated at ${new Date()}`,`import 'package:graphql_flutter/graphql_flutter.dart';`]
        for (let index = 0; index < documents.length; index++) {
            const element = documents[index];
            const definition = element.document.definitions[0] as OperationDefinitionNode; // Currently supporting only 1 definition per document
            const documentBody = (await promisify(readFile)(element.location, { encoding: "utf-8" })).replace(/\$/g, "\\$").trim()
            if (definition.operation === 'mutation') {
                const segment = `${mustacheRender(mutationOptions, { variableName:lower(definition.name.value), className: upper(definition.name.value), documentBody })}`    
                fileSegments.push(segment)
            }
            if (definition.operation === 'query') {
                const segment = `${mustacheRender(queryOptions, { variableName: lower(definition.name.value), className: upper(definition.name.value), documentBody })}`    
                fileSegments.push(segment)
            }
        }
        return fileSegments.join('\n')
    },
    validate: (_, __, ___, outputFile: string) => {
        if (!outputFile.match(/\.dart$/)) {
            throw new Error(`Plugin "graphql_flutter" requires extention to be ".dart"`);
        }
    }
}
