import { ICategory } from '../interfaces/ICategory';

export class Category {
  public name: string;
  public name_encoded: string;

  constructor(data: ICategory) {
    this.name = data.name;
    this.name_encoded = data.name_encoded;
  }
}
