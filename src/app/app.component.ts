import { Component } from '@angular/core';
import { ImgurImage } from './services/imgur.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isInMyList: boolean = true;
  newImage: ImgurImage = {};

  isInMyListChanged(value: boolean) {
    this.isInMyList = value;
  }

  newImageChanged(value: ImgurImage) {
    this.newImage = value;
  }
}
