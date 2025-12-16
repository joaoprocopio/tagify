import { THeaders, TUserAgent } from "@/state/platform/types"
import { userAgent } from "next/server"

export async function getServerUserAgent(
    headers: THeaders,
): Promise<TUserAgent> {
    return userAgent({ headers: headers })
}
