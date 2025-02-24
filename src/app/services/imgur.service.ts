import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface ImgurImage {
  id?: string;
  deletehash?: string;
  link?: string;
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImgurService {
  private accessToken = '18a7dc4d02c13d96401c69c97bd41d531515f77a';
  private apiUrl = 'https://api.imgur.com/3';
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  constructor(private http: HttpClient) { }

  getImagesFromAlbum(albumId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/album/${albumId}/images`, { headers: this.headers });
  }

  addImageToAlbum(albumId: string, image: File | string, imageName: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('album', albumId);
    formData.append('title', imageName);
    return this.http.post(`${this.apiUrl}/image`, formData, { headers: this.headers });
  }

  deleteImage(imageDeleteHash?: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/image/${imageDeleteHash}`, { headers: this.headers });
  }
}
