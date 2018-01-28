import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class VideosService {

  // TODO: MOVE TO PRIVATE CONFIG
  // private API = 'http://localhost:3000';
  private API = environment.API;

  constructor(private http: Http) { }

  extractData(res: Response) {
    return res.json();
  }

  get(params: any): Observable<any[]> {
    return this.http.get(this.API + '/api/videos', params).map(this.extractData);
  }

  getById(id: string): Observable<any> {
    return this.http.get(this.API + '/api/videos/' + id).map(this.extractData);
  }

  play(id: String): Observable<any[]> {
    return this.http.get(this.API + '/api/videos/' + id + '/play').map(this.extractData);
  }

  playAll(): Observable<any[]> {
    return this.http.get(this.API + '/api/videos/playlist').map(this.extractData);
  }

  stopAll(): Observable<any[]> {
    return this.http.get(this.API + '/api/videos/stop').map(this.extractData);
  }

  save(video: any): Observable<any> {
    return this.http.post(this.API + '/api/videos/', video).map(this.extractData);
  }

  put(video: any): Observable<any> {
    return video;
  }
}
