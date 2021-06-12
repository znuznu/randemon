export function getRangeValues(from: number = 0, to: number): number[] {
    if (from > to) {
        return [];
    }

    if (from < 0 || to < 0) {
        return [];
    }

    return [...Array(Math.floor(to - from) + 1)].map((_, i) => from + i);
}

export class PathBuilder {
    private _path: string;

    constructor(base: string) {
        this._path = base;
    }

    public with(part: string): PathBuilder {
        this._path += `/${part}`;

        return this;
    }

    public get path(): string {
        return this._path;
    }
}

export function getRandomNumberInRange(lower: number, upper: number) {
    return ~~(Math.random() * (upper - lower) + lower);
}

export function filterValues<T>(values: T[], toIncludes: T[]): T[] {
    if (!values.length) {
        return [];
    }

    if (!toIncludes.length) {
        return [];
    }

    return values.filter((value) => toIncludes.includes(value));
}
