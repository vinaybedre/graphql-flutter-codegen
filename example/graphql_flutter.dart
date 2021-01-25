//THIS IS A GENERATED FILE, DO NOT MODIFY. YOUR CHANGES WILL BE REWRITTEN ON NEW GENERATION
//Generated at Mon Jan 25 2021 20:03:27 GMT+0100 (Central European Standard Time)
import 'package:graphql_flutter/graphql_flutter.dart';

class CreatePostMutation {
  final String _createPost = """
  mutation CreatePost(\$input: PostInput!) {
    createPost(input: \$input) {
        id
    }
    createMyPost(input: \$input) {
        title
    }
}

mutation CreateMyPost(\$input: PostInput!) {
    createPost(input: \$input) {
        id
    }
}
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
    documentNode: gql(_createPost)
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

class GetPostQuery {
  final String _getPost = """
  query getPost(\$id: ID!) {
    getPost(id: \$id) {
        id
        title
        slug
    }
}
  """;

  static QueryOptions getQueryOptions({@Deprecated('The "document" option has been deprecated, use "documentNode" instead') String document,
    Map<String, dynamic> variables,
    FetchPolicy fetchPolicy,
    ErrorPolicy errorPolicy,
    Object optimisticResult,
    int pollInterval,
    Map<String, dynamic> context,
  }) {
    return QueryOptions({document: document,
    documentNode: gql(_getPost)
    variables: variables,
    fetchPolicy: fetchPolicy,
    errorPolicy: errorPolicy,
    optimisticResult: optimisticResult,
    pollInterval: pollInterval, 
    context: context});
  }
}