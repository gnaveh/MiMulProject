import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ImgurImage, ImgurService } from '../services/imgur.service';

@Component({
  selector: 'app-mimul-content',
  standalone: false,
  templateUrl: './mimul-content.component.html',
  styleUrl: './mimul-content.component.css'
})
export class MimulContentComponent implements OnChanges {
  @Input() isInMyList: boolean = true;
  @Input() newImage: ImgurImage = {};

  images: ImgurImage[] = [];


  privateAlbumId: string = "msfdyJt";
  publicAlbumId: string = "uGviM5l";
  constructor(private imgurService: ImgurService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['newImage']) {
      this.images.push(this.newImage);
    }

    if (changes['isInMyList']) {
      if (this.isInMyList)
        this.fetchImages(this.privateAlbumId)

      else
        this.fetchImages(this.publicAlbumId)
    }
  }

  fetchImages(albumId: string) {
    this.images = [];
    this.imgurService.getImagesFromAlbum(albumId).subscribe({
      next: (response) => {
        if (response.success) {
          response.data.forEach((imageFromImgur: any) => {
            this.images.push({
              id: imageFromImgur.id as string,
              deletehash: imageFromImgur.deletehash as string,
              link: imageFromImgur.link as string,
              title: imageFromImgur.title as string
            });
          })
          console.log('Success fetching images:', this.images);
        }
        else {
          console.error("oh no, an error");
        }
      },
      error: (err) => {
        console.log('Error fetching images:', err);
      }
    });
  }
}
