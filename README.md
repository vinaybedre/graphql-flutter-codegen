# graphql-flutter-codegen
GraphQL codegen [plugin](https://graphql-code-generator.com/) for Flutter+Dart using [graphql_flutter](https://pub.dev/packages/graphql_flutter). This is in a very early stage.

## How to install?
`yarn add @vinaybedre/graphql-flutter-codegen`

## How to use?
This plugin can be used along with [graphql-code-generator](https://graphql-code-generator.com/)

## Example codegen-config.yml
```yaml
overwrite: true
schema: "./schemas/**/*.graphqls"
documents: "./documents/**/*.graphql"
generates:
  ./graphql_flutter_documents.dart:
    plugins:
      - "@vinaybedre/graphql-flutter-codegen"
```

This shall output a `dart` file like [this](https://github.com/vinaybedre/graphql-flutter-codegen/blob/master/example/graphql_flutter.dart)

## Example project
Find a working example project at [example](https://github.com/vinaybedre/graphql-flutter-codegen/tree/master/example)