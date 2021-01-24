# graphql-flutter-codegen
GraphQL codegen for Flutter+Dart using graphql_flutter. This is in a very early stage.

## How to use?
This plugin can be used along with [graphql-code-generator](https://graphql-code-generator.com/)

## Example codegen-config.yaml
```yaml
overwrite: true
schema: "./schemas/**/*.graphqls"
documents: "./documents/**/*.graphql"
generates:
  ./graphql_flutter_documents.dart:
    plugins:
      - "@vinaybedre/graphql-flutter-codegen"
```