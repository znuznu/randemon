import { createContext } from 'react';

import { Team } from '../models/team';

type TeamContext = {
  team: Team | null;
  setTeam: ((team: Team) => void) | null;
  toggleLock: ((index: number) => void) | null;
  isLoading: boolean;
  setIsLoading: ((isLoading: boolean) => void) | null;
};

const Context = createContext<TeamContext>({
  team: null,
  setTeam: null,
  toggleLock: null,
  isLoading: false,
  setIsLoading: null
});

export { Context };
