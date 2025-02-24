import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddImageComponent } from '../add-image/add-image.component';
import { ImgurImage } from '../services/imgur.service';

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
  constructor(private dialog: MatDialog) { }

  changeIsInMyListValue(): void {
    this.isInMyList = !this.isInMyList;
    this.isInMyListEmitter.emit(this.isInMyList);
  }

  addNewImage() {
    const dialogRef = this.dialog.open(AddImageComponent, {
      width: '400px',
      height: '130px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newImageEmitter.emit(result);
      }
    });
  }
}
