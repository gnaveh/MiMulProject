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
  isLoading: boolean = false;

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
    const fetchedImages: ImgurImage[] = [];

    this.images = [
      {
        id: "JMM3zZL",
        deletehash: "n0tkLZJNKIktHJG",
        link: "https://i.imgur.com/JMM3zZL.jpeg",
        title: '',
      },
      {
        id: "w3kyhKj",
        deletehash: "rj4rm9RQj5ynwVc",
        link: "https://i.imgur.com/w3kyhKj.jpeg",
        title: "אני לא מאמין",
      },
      {
        id: "1rZTOXX",
        deletehash: "tzpY1wEF3aYYrUC",
        link: "https://i.imgur.com/1rZTOXX.jpeg",
        title: "גדוד תובלה",
      },
      {
        id: "1g8dQOK",
        deletehash: "SxLdf44WOhOhD29",
        link: "https://i.imgur.com/1g8dQOK.jpeg",
        title: "גדוד תובלה",
      },
      {
        id: "3GMnJFl",
        deletehash: "Glwjj0LcBEMitys",
        link: "https://i.imgur.com/3GMnJFl.jpeg",
        title: "גדוד תובלה",
      },
    ];
    /*this.isLoading = true;
    this.imgurService.getImagesFromAlbum(albumId).subscribe({
      next: (response) => {
        if (response.success) {
          response.data.forEach((imageFromImgur: any) => {
            fetchedImages.push({
              id: imageFromImgur.id as string,
              deletehash: imageFromImgur.deletehash as string,
              link: imageFromImgur.link as string,
              title: imageFromImgur.title as string
            });
          })
          this.images = fetchedImages;
          console.log('Success fetching images:', this.images);
        }
        else {
          console.error("oh no, an error");
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error fetching images:', err);
        this.isLoading = false;
      }
    });*/
  }

  removeImage(imageId: string) {
    this.images = this.images.filter(image => image.id !== imageId);
  }
}
