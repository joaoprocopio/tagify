export const ListProducts = `#graphql
query ListProducts {
  products (first: 20) {
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
