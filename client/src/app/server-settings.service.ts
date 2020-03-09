import { Injectable } from '@angular/core';

const CONFIG = {
  apiUrl: 'http://localhost:8080/'
};

@Injectable({
  providedIn: 'root'
})
export class ServerSettingsService {

  constructor() { }

  public getApiURL() {
    return CONFIG.apiUrl;
  }

}
