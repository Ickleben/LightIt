import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { addQueriesToUrl } from '../../core/utils/add-queries-to-url';
import { environment } from '../../../environments/environment';
import { Category } from '../../core/types/modals/Category';
import { ICategory } from '../../core/types/interfaces/ICategory';

const routes = {
  getCategories: () => `/gifs/categories`,
};

const apiKey = environment.apiKey;

@Injectable()
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<IGetClient>(addQueriesToUrl(routes.getCategories(), { apiKey }))
      .pipe(
        map((res) =>
          res.data.map((category: ICategory) => new Category(category))
        )
      );
  }
}
export interface IGetClient {
  data: ICategory[];
}
