export function resolveCachePolicy(
    fallbackCache: RequestCache,
    desiredCache: RequestCache,
) {
    return fallbackCache === "default" ? desiredCache : fallbackCache
}
