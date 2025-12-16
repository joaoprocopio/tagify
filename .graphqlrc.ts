import "./envConfig.ts"
import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset"
import type { IGraphQLConfig } from "graphql-config"

const documents: string[] = ["./src/**/graphql.ts"]
const output: string = "./src/lib/shopify/types"

const gqlrcConfig: IGraphQLConfig = {
    schema: process.env.SHOPIFY_ADMIN_GQL_SCHEMA_URL,
    documents: documents,
    include: documents,
    projects: {
        default: shopifyApiProject({
            apiType: ApiType.Admin,
            apiVersion: process.env.SHOPIFY_API_VERSION,
            documents: documents,
            outputDir: output,
            enumsAsConst: true,
        }),
    },
}

export default gqlrcConfig
