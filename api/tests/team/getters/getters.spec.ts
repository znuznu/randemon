import CacheService from '../../../src/cache/cacheService';
import { logger } from '../../../src/logger';
import { getPokemonById } from '../../../src/team/getters';

// describe('::getters', () => {
//     let cacheService: CacheService;

//     describe('getPokemonById', () => {
//         beforeAll(() => {
//             cacheService = new CacheService(logger, 7777);
//         });

//         afterEach(() => {
//             // close db
//         });

//         describe('if the pokemon is in cache', () => {
//             it('should return the pokemon in cache', () => {});
//         });

//         describe('if the pokemon is not in cache', () => {
//             it('should make an http request', () => {});

//             it('should return the pokemon', () => {});
//         });
//     });
// });
