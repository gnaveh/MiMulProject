import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImgurImage, ImgurService } from '../services/imgur.service';

@Component({
  selector: 'app-mimul-header',
  standalone: false,
  templateUrl: './mimul-header.component.html',
  styleUrl: './mimul-header.component.css'
})
export class MimulHeaderComponent {
  @Output() isInMyListEmitter = new EventEmitter<boolean>();
  @Output() newImageEmitter = new EventEmitter<ImgurImage>();

  isInMyList: boolean = true;
  privateAlbumId: string = 'msfdyJt'

  constructor(private dialog: MatDialog, private imgurService: ImgurService) { }

  changeIsInMyListValue(): void {
    this.isInMyList = !this.isInMyList;
    this.isInMyListEmitter.emit(this.isInMyList);
  }

  addImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedImage = input.files?.[0] || null;

    if (!selectedImage) {
      alert('לא נבחרה תמונה');
      return;
    }

    const imageName = selectedImage.name.replace(/\.[^/.]+$/, "");  

    console.log(imageName);

    this.imgurService.addImageToAlbum(this.privateAlbumId, selectedImage, imageName).subscribe({
      next: (response) => {
        if (response.success) {
          const imgurImage: ImgurImage = {
            id: response.data.id as string,
            deletehash: response.data.deletehash as string,
            link: response.data.link as string,
            title: response.data.title as string
          };

          this.newImageEmitter.emit(imgurImage);
        }
      },
      error: (err) => {
        console.log('Error fetching images:', err);
      }
    });
  }
}
