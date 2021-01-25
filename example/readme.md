# How to setup the example project?
1. `yarn init`
2. `yarn add --dev @graphql-codegen/cli`
3. `yarn add graphql`
4. `yarn graphql-codegen init` and follow on screen steps
5. Open your codegen.yml file and add the following under generates
```yml
  ./graphql_flutter_documents.dart:
    plugins:
      - "@vinaybedre/graphql-flutter-codegen"
```

# How to use?
1. import graphql_flutter_documents.dart file
2. `GraphQLDocument().getMyPosts`