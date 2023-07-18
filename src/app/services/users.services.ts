import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public client: HttpClient) {}

  public url = 'https://jsonplaceholder.typicode.com/users';

  getAllUsers() {
    return this.client.get(this.url);
  }

  getUser(id: any) {
    return this.client.get(`${this.url}/${id}`);
  }

  getAlbums(id:any) {
    return this.client.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
  }

  getPhotos(id:any) {
    return this.client.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
  }

  deleteStudent(id: any) {
    return this.client.delete(`${this.url}/${id}`);
  }
}
