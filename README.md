# graphql-flutter-codegen
GraphQL codegen for Flutter+Dart using [graphql_flutter](https://pub.dev/packages/graphql_flutter). This is in a very early stage.

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

This shall output a `dart` file
```dart
//THIS IS A GENERATED FILE, DO NOT MODIFY. YOUR CHANGES WILL BE REWRITTEN ON NEW GENERATION
//Generated at Sun Jan 24 2021 20:39:46 GMT+0100 (Central European Standard Time)

String getMyPosts = """
            query getMyPosts {
    getPosts {
        id
        title
        slug
    }
}
            """;
```

## Example project
Find a working example project at [example](https://github.com/vinaybedre/graphql-flutter-codegen/tree/master/example)