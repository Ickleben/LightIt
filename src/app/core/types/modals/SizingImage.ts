import { ISizingImage } from '../interfaces/ISizingImage';

export class SizingImage {
  public fixed_height: any;

  constructor(data: ISizingImage) {
    this.fixed_height = data.fixed_height;
  }
}
