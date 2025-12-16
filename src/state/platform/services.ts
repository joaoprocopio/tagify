import { TUserAgent } from "@/state/platform/types"
import { userAgentFromString } from "next/server"

export async function getUserAgent(): Promise<TUserAgent> {
    return userAgentFromString(navigator.userAgent)
}
