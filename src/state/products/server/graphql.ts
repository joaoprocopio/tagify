export const ListProductTags = `#graphql
query ListProductTags {
  productTags(first: 100) {
    edges {
      node
    }
  }
}` as const

export const ListProducts = `#graphql
query ListProducts($queryString: String) {
products(first: 20, query: $queryString) {
    edges {
      node {
        id
        title
        status
        tags
        totalInventory
        tracksInventory
        productType
        variantsCount {
          count
        }
        media(first: 1) {
          nodes {
            preview {
              image {
                altText
                url
                width
                height
                thumbhash
              }
            }
          }
        }
      }
    }
  }
}` as const
