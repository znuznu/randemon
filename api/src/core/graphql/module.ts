import { Resolver } from './resolver/resolver.interface';

// TODO remove
export class Module {
    private resolvers: Map<string, Resolver> = new Map();

    addResolver(name: string, resolver: Resolver): Module {
        this.resolvers.set(name, resolver);

        return this;
    }

    getResolvers(): Map<string, Resolver> {
        return this.resolvers;
    }
}
