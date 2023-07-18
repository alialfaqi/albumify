import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.services';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  constructor(private route: ActivatedRoute, public SService: UsersService) {}

  userId: any;
  user: any;
  albumId: any;
  photos: any;
  ngOnInit(): void {
    // getting album id and user id
    this.albumId = this.route.snapshot.paramMap.get('albumId');
    this.userId = this.route.snapshot.paramMap.get('userId');

    // console.log(this.albumId, this.userId);

    this.SService.getUser(this.userId).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.user = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // getting photos in selected album
    this.SService.getPhotos(this.albumId).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.photos = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
