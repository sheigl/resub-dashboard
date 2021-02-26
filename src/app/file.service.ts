import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../environments/environment';
import { GetFilesResult } from './models/get-files-result';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {     
  }

  getResubFiles() {
    return this.http.get<GetFilesResult>(`${this.baseUrl}/resub/files`);
  }

  submitResub(file: any) {
    return this.http.post<any>(`${this.baseUrl}/resub/files`, file);
  }
}