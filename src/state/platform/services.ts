import { userAgent, userAgentFromString } from "next/server"

export type UserAgent = ReturnType<typeof userAgent>

export class PlatformServices {
    static async getUserAgent(): Promise<UserAgent> {
        return userAgentFromString(navigator.userAgent)
    }
}
