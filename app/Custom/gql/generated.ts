/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchGraphql } from './fetcher';
export type CourseApplicationInput = {
  audienceId?: string | null | undefined;
  formatId: string;
  message: string;
  token: string;
  topicIds: Array<string>;
  website?: string | null | undefined;
};

export type PrepareCourseApplicationMutationVariables = Exact<{ [key: string]: never; }>;


export type PrepareCourseApplicationMutation = { prepareCourseApplication: { token: string, waitMs: number } };

export type SubmitCourseApplicationMutationVariables = Exact<{
  input: CourseApplicationInput;
}>;


export type SubmitCourseApplicationMutation = { submitCourseApplication: { id: string, message: string } };


export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const PrepareCourseApplicationDocument = new TypedDocumentString(`
    mutation PrepareCourseApplication {
  prepareCourseApplication {
    token
    waitMs
  }
}
    `);

export const usePrepareCourseApplicationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PrepareCourseApplicationMutation, TError, PrepareCourseApplicationMutationVariables, TContext>) => {
    
    return useMutation<PrepareCourseApplicationMutation, TError, PrepareCourseApplicationMutationVariables, TContext>(
      {
    mutationKey: ['PrepareCourseApplication'],
    mutationFn: (variables?: PrepareCourseApplicationMutationVariables) => fetchGraphql<PrepareCourseApplicationMutation, PrepareCourseApplicationMutationVariables>(PrepareCourseApplicationDocument, variables)(),
    ...options
  }
    )};

usePrepareCourseApplicationMutation.getKey = () => ['PrepareCourseApplication'];

export const SubmitCourseApplicationDocument = new TypedDocumentString(`
    mutation SubmitCourseApplication($input: CourseApplicationInput!) {
  submitCourseApplication(input: $input) {
    id
    message
  }
}
    `);

export const useSubmitCourseApplicationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SubmitCourseApplicationMutation, TError, SubmitCourseApplicationMutationVariables, TContext>) => {
    
    return useMutation<SubmitCourseApplicationMutation, TError, SubmitCourseApplicationMutationVariables, TContext>(
      {
    mutationKey: ['SubmitCourseApplication'],
    mutationFn: (variables?: SubmitCourseApplicationMutationVariables) => fetchGraphql<SubmitCourseApplicationMutation, SubmitCourseApplicationMutationVariables>(SubmitCourseApplicationDocument, variables)(),
    ...options
  }
    )};

useSubmitCourseApplicationMutation.getKey = () => ['SubmitCourseApplication'];
