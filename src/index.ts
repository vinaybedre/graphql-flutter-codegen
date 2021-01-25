import { DocumentNode } from "graphql";
import { readFile } from 'fs';
import { promisify } from 'util'
import {basename,extname } from 'path'

interface Documents {
    location: string;
    document: DocumentNode
}

module.exports = {
    plugin: async(_, documents: Documents[]) => {
        
        const strs = ["//THIS IS A GENERATED FILE, DO NOT MODIFY. YOUR CHANGES WILL BE REWRITTEN ON NEW GENERATION",`//Generated at ${new Date()}`,"class GraphQLDocument {"]
        for (let index = 0; index < documents.length; index++) {
            const element = documents[index];
            const fileContents = await promisify(readFile)(element.location, { encoding: "utf-8" })
            const extension = extname(element.location)
            const str = `\tfinal String ${basename(element.location,extension)} = """
            \t${fileContents.replace(/\$/g,"\\$").trim()}
            """;\n`;
            strs.push(str)
        }
        strs.push("}")
        return strs.join('\n')
    },
    validate: (_, __, ___, outputFile:string) => {
        if (!outputFile.match(/\.dart$/)) {
          throw new Error(`Plugin "graphql_flutter" requires extention to be ".dart"`);
        }
    }
}
