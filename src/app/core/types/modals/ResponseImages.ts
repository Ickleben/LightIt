import { IImage } from '../interfaces/IImage';
import { IResponseImages } from '../interfaces/IResponseImages';
import { Image } from './Image';

export class ResponseImages {
  public data: Image[];
  public pagination: { total_count: number };

  constructor(data: IResponseImages) {
    this.data = data.data.map((image: IImage) => new Image(image));
    this.pagination = data.pagination;
  }
}
