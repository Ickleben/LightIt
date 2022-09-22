import { IImage } from '../interfaces/IImage';
import { SizingImage } from './SizingImage';

export class Image {
  public images: SizingImage;

  constructor(data: IImage) {
    this.images = data.images;
  }
}
