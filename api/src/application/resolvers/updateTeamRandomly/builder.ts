import DataService from '../../../domain/team/services/data.service';
import UpdateTeamRandomlyResolver from './resolver';

export function buildUpdateTeamRandomlyResolver(
    dataService: DataService
): UpdateTeamRandomlyResolver {
    return new UpdateTeamRandomlyResolver(dataService);
}
