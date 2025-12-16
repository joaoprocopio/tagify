import { TUserAgent } from "@/state/platform/types"
import { headers } from "next/headers"
import { userAgent } from "next/server"

export async function getServerUserAgent(): Promise<TUserAgent> {
    return userAgent({
        headers: await headers(),
    })
}
