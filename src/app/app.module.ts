import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MimulContentComponent } from './mimul-content/mimul-content.component';
import { MimulHeaderComponent } from './mimul-header/mimul-header.component';
import { MimulImageComponent } from './mimul-image/mimul-image.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { AddImageComponent } from './add-image/add-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MimulContentComponent,
    MimulHeaderComponent,
    MimulImageComponent,
    AddImageComponent,
    ImageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
