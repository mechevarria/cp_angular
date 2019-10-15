import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = '/api/index.xsjs';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getEvents(page: number, limit: number): Observable<any> {
    const options: any = {
      params: new HttpParams()
        .append('limit', limit.toString())
        .append('offset', (page - 1).toString())
    };

    return this.http.get<any>(this.url, options).pipe(
      catchError(error => {
        this.messageService.error(`getEvents() ${error.message}`);
        return of(null);
      })
    )
  };
}
