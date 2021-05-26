export default interface SpritePAPI {
    front_default: string;
    other: {
        'official-artwork': {
            front_default: string;
        };
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
