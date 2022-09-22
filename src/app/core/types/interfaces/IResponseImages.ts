import { IImage } from './IImage';

export interface IResponseImages {
  data: IImage[];
  pagination: { total_count: number };
}
