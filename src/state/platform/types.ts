export type TUserAgent = ReturnType<(typeof import("next/server"))["userAgent"]>

export type THeaders = Awaited<
    ReturnType<(typeof import("next/headers"))["headers"]>
>
