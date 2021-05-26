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
    return this.http.get<GetFilesResult[]>(`${this.baseUrl}/file/resub`);
  }

  deleteFile(file: any) {
    return this.http.delete<void>(`${environment.baseNodeRedUrl}/file/resub?filename=${file.originalFilename}`);
  }

  submitResub(file: any) {
    return this.http.post<any>(`${environment.baseNodeRedUrl}/file/resub`, file);
  }
}