import DataService from '../service/data.service';
import UpdateTeamRandomlyResolver from './resolver';

export function buildUpdateTeamRandomlyResolver(
    dataService: DataService
): UpdateTeamRandomlyResolver {
    return new UpdateTeamRandomlyResolver(dataService);
}
