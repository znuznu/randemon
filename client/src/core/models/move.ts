import { Type } from './type';

export default interface Move {
  accuracy: number | null;
  power: number | null;
  pp: number;
  type: Type;
  name: string;
}
