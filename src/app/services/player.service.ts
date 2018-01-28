import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class PlayerService {

  private playerURL = environment.API + '/api/player';

  constructor(private http: Http) { }

  extractData(res: Response) {
    return res.json();
  }

  get(player: String): Observable<any> {
    return this.http.get(this.playerURL + '/' + player).map(this.extractData);
  }

  update(player: any): Observable<any> {
    return this.http.put(this.playerURL, player).map(this.extractData);
  }

}
