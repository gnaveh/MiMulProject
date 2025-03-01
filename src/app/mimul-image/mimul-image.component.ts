import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImgurImage, ImgurService } from '../services/imgur.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-mimul-image',
  standalone: false,
  templateUrl: './mimul-image.component.html',
  styleUrl: './mimul-image.component.css'
})
export class MimulImageComponent {
  @Input() isInMyList: boolean = true;
  @Input() image: ImgurImage = {};

  publicAlbumId: string = "uGviM5l";

  isImageDeleted: boolean = false;
  constructor(private imgurService: ImgurService, private dialog: MatDialog) { }

  openImage() {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl: this.image.link },
      minWidth: '10vh', 
      minHeight: '20vh',
      maxWidth: '75vw',  
      maxHeight: '95vh', 
      disableClose: false
    });
  }

  deleteImage() {
    this.imgurService.deleteImage(this.image.deletehash).subscribe({
      next: (response) => {
        if (response.success) {
          this.isImageDeleted = true;
        }
      },
      error: (err) => {
        console.log('Error:', err);
      }
    })
  }

  moveImageToPublicAlbum() {
    this.imgurService.addImageToAlbum(this.publicAlbumId, this.image.link || '', this.image.title || '').subscribe({
      next: (response) => {
        if (response.success) {
          this.isImageDeleted = true;
          this.imgurService.deleteImage(this.image.deletehash);
        }
      },
      error: (err) => {
        console.log('Error:', err);
      }
    });
  }
}
