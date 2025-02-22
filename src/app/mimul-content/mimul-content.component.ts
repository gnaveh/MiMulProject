import { Component } from '@angular/core';
import { ImgurService } from '../services/imgur.service';

@Component({
  selector: 'app-mimul-content',
  standalone: false,
  templateUrl: './mimul-content.component.html',
  styleUrl: './mimul-content.component.css'
})
export class MimulContentComponent {
  images: any[] = [{
    title: "ניסיון 1",
    link: "https://i.imgur.com/VOTpBdM.jpeg"
  },
    {
      title: "ניסיון 2",
      link: "https://i.imgur.com/4jjPeDu.jpeg"
    }];

  privateAlbumId: string = "msfdyJt";
  constructor(private imgurService: ImgurService) { }

  a() {
    this.imgurService.getImagesFromAlbum(this.privateAlbumId).subscribe({
      next: (response) => {
        if (response.success) {
          //this.images = response.data;
          console.log('Success fetching images:', response);
        }
      },
      error: (err) => {
        console.log('Error fetching images:', err);
      }
    });
  }
}
