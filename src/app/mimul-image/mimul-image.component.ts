import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mimul-image',
  standalone: false,
  templateUrl: './mimul-image.component.html',
  styleUrl: './mimul-image.component.css'
})
export class MimulImageComponent {

  @Input() image: any;
}
