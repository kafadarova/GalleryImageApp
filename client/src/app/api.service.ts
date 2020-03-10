import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrl: string = 'http://localhost:8080/';
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(private http: HttpClient) { }

  getImages() {
    const url = `${this.apiUrl}api/images`;
    const result = this.http.get(url);
    return result;
  }

  updateImage(image, desc) {
    const data = {
      description: desc
    };
    const url = `${this.apiUrl}api/images/${image.uid}`;
    const result = this.http.put(url, data);
    return result;
  }

  deleteImage(uid) {
    const url = `${this.apiUrl}api/images/${uid}`;
    const result = this.http.delete(url);
    return result;
  }
}
