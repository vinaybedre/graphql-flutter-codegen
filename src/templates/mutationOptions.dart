
class {{className}}Mutation {
  final String _{{variableName}} = """
  {{documentBody}}
  """;

  static MutationOptions getQueryOptions({@Deprecated('The "document" option has been deprecated, use "documentNode" instead') String document,
    DocumentNode documentNode,
    Map<String, dynamic> variables,
    FetchPolicy fetchPolicy,
    ErrorPolicy errorPolicy,
    Map<String, dynamic> context,
    OnMutationCompleted onCompleted,
    OnMutationUpdate update,
    OnError onError,
  }) {
    return MutationOptions({document: document,
    documentNode: gql(_{{variableName}})
    variables: variables,
    fetchPolicy: fetchPolicy,
    errorPolicy: errorPolicy,
    context: context,
    onCompleted: onCompleted,
    update: update,
    onError: onError
    });
  }
}