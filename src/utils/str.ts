export function capitalizeFirst(input: string): string {
    return input
        .charAt(0)
        .toUpperCase()
        .concat(input.substring(1, input.length).toLocaleLowerCase())
}
