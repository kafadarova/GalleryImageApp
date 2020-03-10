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

  uploadImage(file: File) {
    const headers = new Headers();
    const url =  `${this.apiUrl}api/upload`;
    const result = this.http.post(url, {headers: headers});
    return result;
  }
  getImages() {
    const url = `${this.apiUrl}api/images`;
    const result = this.http.get(url);
    return result;
  }

  deleteImage(uid) {
    const url =`${this.apiUrl}api/images/${uid}`;
    const result = this.http.delete(url);
    return result;
  }
}
