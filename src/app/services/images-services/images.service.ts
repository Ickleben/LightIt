import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { addQueriesToUrl } from '../../core/utils/add-queries-to-url';
import { environment } from '../../../environments/environment';
import { ResponseImages } from '../../core/types/modals/ResponseImages';
import { IImagesParams } from '../../core/types/interfaces/IImagesParams';

const routes = {
  getImages: (requestType: string) => `/gifs/${requestType}`,
};

const apiKey = environment.apiKey;

@Injectable()
export class ImagesService {
  constructor(private httpClient: HttpClient) {}

  public getImages(
    requestType: string,
    params: IImagesParams
  ): Observable<ResponseImages> {
    return this.httpClient
      .get<ResponseImages>(
        addQueriesToUrl(routes.getImages(requestType), { ...params, apiKey })
      )
      .pipe(map((res) => new ResponseImages(res)));
  }
}
