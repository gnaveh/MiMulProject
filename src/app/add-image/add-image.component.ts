import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImgurImage, ImgurService } from '../services/imgur.service';

@Component({
  selector: 'app-add-image',
  standalone: false,
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.css'
})
export class AddImageComponent {
  imageName: string = '';
  selectedImage: File | null = null;
  privateAlbumId: string = 'msfdyJt';

  constructor(private dialogRef: MatDialogRef<AddImageComponent>, private imgurService: ImgurService) { }

  handleFolderSelection(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedImage = input.files?.[0] || null;
  }

  addImage() {
    if (!this.selectedImage) {
      alert('לא נבחרה תמונה');
      return;
    }

    this.imgurService.addImageToAlbum(this.privateAlbumId, this.selectedImage, this.imageName).subscribe({
      next: (response) => {
        if (response.success) {
          const imgurImage: ImgurImage = {
              id: response.data.id as string,
              deletehash: response.data.deletehash as string,
              link: response.data.link as string,
              title: response.data.title as string
          };
          this.dialogRef.close(imgurImage);
         }
      },
      error: (err) => {
        console.log('Error fetching images:', err);
      }
    });
  }
}
