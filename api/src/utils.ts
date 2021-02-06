export function range(from: number = 0, to: number): number[] {
    return [...Array(Math.floor(to - from) + 1)].map((_, i) => from + i);
}

export class UrlBuilder {
    private _url: string;

    constructor(base: string) {
        this._url = base;
    }

    public with(part: string): UrlBuilder {
        this._url += `/${part}`;

        return this;
    }

    public get url(): string {
        return this._url;
    }
}

export function randInRange(lower: number, upper: number) {
    return ~~(Math.random() * (upper - lower) + lower);
}
