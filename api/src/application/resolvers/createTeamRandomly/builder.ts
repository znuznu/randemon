import DataService from '../../../domain/team/services/data.service';
import CreateTeamRandomlyResolver from './resolver';

export function buildCreateTeamRandomlyResolver(
    dataService: DataService
): CreateTeamRandomlyResolver {
    return new CreateTeamRandomlyResolver(dataService);
}
