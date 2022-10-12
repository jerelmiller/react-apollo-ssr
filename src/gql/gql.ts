/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query CountryQuery($code: ID!) {\n    country(code: $code) {\n      code\n      name\n      capital\n      emoji\n    }\n  }\n": types.CountryQueryDocument,
    "\n  query LanguagesQuery($countryCode: ID!) {\n    country(code: $countryCode) {\n      code\n      languages {\n        code\n        name\n      }\n    }\n  }\n": types.LanguagesQueryDocument,
    "\n  query StatesQuery($countryCode: ID!) {\n    country(code: $countryCode) {\n      code\n      states {\n        name\n      }\n    }\n  }\n": types.StatesQueryDocument,
    "\n  query AllCountriesQuery {\n    countries {\n      code\n      name\n    }\n  }\n": types.AllCountriesQueryDocument,
};

export function graphql(source: "\n  query CountryQuery($code: ID!) {\n    country(code: $code) {\n      code\n      name\n      capital\n      emoji\n    }\n  }\n"): (typeof documents)["\n  query CountryQuery($code: ID!) {\n    country(code: $code) {\n      code\n      name\n      capital\n      emoji\n    }\n  }\n"];
export function graphql(source: "\n  query LanguagesQuery($countryCode: ID!) {\n    country(code: $countryCode) {\n      code\n      languages {\n        code\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query LanguagesQuery($countryCode: ID!) {\n    country(code: $countryCode) {\n      code\n      languages {\n        code\n        name\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query StatesQuery($countryCode: ID!) {\n    country(code: $countryCode) {\n      code\n      states {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query StatesQuery($countryCode: ID!) {\n    country(code: $countryCode) {\n      code\n      states {\n        name\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query AllCountriesQuery {\n    countries {\n      code\n      name\n    }\n  }\n"): (typeof documents)["\n  query AllCountriesQuery {\n    countries {\n      code\n      name\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;