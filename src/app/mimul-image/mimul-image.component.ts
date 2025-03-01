import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() deleteImageEmitter = new EventEmitter<string>();


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
    this.deleteImageEmitter.emit(this.image.id);
    console.log("deleted image");


    /*this.imgurService.deleteImage(this.image.deletehash).subscribe({
      next: (response) => {
        if (response.success) {
          this.deleteImageEmitter.emit(this.image.id);
          console.log("deleted image");
        }
      },
      error: (err) => {
        console.log('Error:', err);
      }
    })*/
  }

  moveImageToPublicAlbum() {
    this.imgurService.addImageToAlbum(this.publicAlbumId, this.image.link || '', this.image.title || '').subscribe({
      next: (response) => {
        if (response.success) {
          this.deleteImageEmitter.emit(this.image.id);
          this.imgurService.deleteImage(this.image.deletehash).subscribe({
            next: (_) => {
              console.log("deleted and passed image");
            },
            error: (err) => {
              console.log('Error:', err);
            }
          });
        }
      },
      error: (err) => {
        console.log('Error:', err);
      }
    });
  }
}
