import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteUsersService {
  constructor(private myClient:HttpClient) {}
  private Base_URL = 'http://localhost:3000/users';

  getRegisteredUsers() {
    return this.myClient.get(this.Base_URL);
  }

  addUser(user:any){
    return this.myClient.post(this.Base_URL , user);
  }
}
