export function array<T>(length: number): T[] {
    return Array.from<T>({ length })
}
