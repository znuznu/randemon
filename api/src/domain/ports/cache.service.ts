export interface CacheService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    clear(): Promise<void>;
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
}
