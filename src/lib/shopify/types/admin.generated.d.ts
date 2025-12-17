/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types.d.ts';

export type ListProductTagsQueryVariables = AdminTypes.Exact<{ [key: string]: never; }>;


export type ListProductTagsQuery = { productTags?: AdminTypes.Maybe<{ edges: Array<Pick<AdminTypes.StringEdge, 'node'>> }> };

export type ListProductsQueryVariables = AdminTypes.Exact<{
  query?: AdminTypes.InputMaybe<AdminTypes.Scalars['String']['input']>;
}>;


export type ListProductsQuery = { products: { edges: Array<{ node: (
        Pick<AdminTypes.Product, 'id' | 'title' | 'status' | 'tags' | 'totalInventory' | 'tracksInventory' | 'productType'>
        & { variantsCount?: AdminTypes.Maybe<Pick<AdminTypes.Count, 'count'>>, media: { nodes: Array<{ preview?: AdminTypes.Maybe<{ image?: AdminTypes.Maybe<Pick<AdminTypes.Image, 'altText' | 'url' | 'width' | 'height' | 'thumbhash'>> }> }> } }
      ) }> } };

interface GeneratedQueryTypes {
  "#graphql\nquery ListProductTags {\n  productTags(first: 100) {\n    edges {\n      node\n    }\n  }\n}": {return: ListProductTagsQuery, variables: ListProductTagsQueryVariables},
  "#graphql\nquery ListProducts($query: String) {\n  products(first: 20, query: $query) {\n    edges {\n      node {\n        id\n        title\n        status\n        tags\n        totalInventory\n        tracksInventory\n        productType\n        variantsCount {\n          count\n        }\n        media(first: 1) {\n          nodes {\n            preview {\n              image {\n                altText\n                url\n                width\n                height\n                thumbhash\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": {return: ListProductsQuery, variables: ListProductsQueryVariables},
}

interface GeneratedMutationTypes {
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
