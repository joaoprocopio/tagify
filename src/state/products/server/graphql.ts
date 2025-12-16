export const ListProducts = `#graphql
query ListProducts {
  products (first: 20) {
    edges {
      node {
        title
        status
        tags
        totalInventory
        tracksInventory
        productType
        variantsCount {
          count
        }
        category {
          name
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
