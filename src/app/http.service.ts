import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers = new HttpHeaders({});

  constructor(private httpClient:HttpClient ) { 
    this.headers = this.headers.set('Content-Type', 'application/x-www-form-urlencoded'); 
    // this.headers = this.headers.set('cache-control', 'no-cache'); 
    // this.headers = this.headers.set('Access-Control-Allow-Origin', '*'); 
  }
  //"https://cors-anywhere.herokuapp.com/"+

  authenticateRunner(baseURL: String, username: String, password: String){
    return this.httpClient.post(baseURL+"v1/authentication", {
      "username":username,
      "password":password
    }, {headers: this.headers});
  }
}
