export function range(from: number = 0, to: number): number[] {
    return [...Array(Math.floor(to - from) + 1)].map((_, i) => from + i);
}
