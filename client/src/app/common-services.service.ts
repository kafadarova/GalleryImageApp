import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ServerSettingsService } from './server-settings.service';

@Injectable({
  providedIn: 'root'
})

export class CommonServicesService {
  private apiUrl = this.svrSettings.getApiURL();
  constructor(private http: HttpClient,
              private svrSettings: ServerSettingsService) { }
  // uploadImage(params) {
  //   const headers = new Headers();
  //   const url = this.apiUrl + 'images/upload';
  //   console.log(params);
  //   const result = this.http.post(url, params, {headers: headers})
  //   .map(res => res.json());
  //   return result;
  // }
  getImages() {
    const url = this.apiUrl + 'api/images';
    const result = this.http.get(url)
    .pipe(map((res:Response) => res.json()));
    return result;
  }
  // deleteImage(params) {
  //   const headers = new Headers();
  //   const url = this.apiUrl + 'images/deleteImage';
  //   const result = this.http.post(url, params, {headers: headers})
  //   .map(res => res.json());
  //   return result;
  // }
}
