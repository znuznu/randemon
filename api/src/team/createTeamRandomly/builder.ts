import DataService from '../service/data.service';
import CreateTeamRandomlyResolver from './resolver';

export function buildCreateTeamRandomlyResolver(
    dataService: DataService
): CreateTeamRandomlyResolver {
    return new CreateTeamRandomlyResolver(dataService);
}
