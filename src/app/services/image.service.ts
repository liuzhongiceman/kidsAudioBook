import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  
  imageUpload(imageForm: FormData) {
    console.log('file uploading');
    return this.http.post('http://localhost:3000/upload', imageForm);
  }
  
}
