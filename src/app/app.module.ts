import { FilterInputPipe } from './pipes/filterInputPipe';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { ListaVideosComponent } from './lista-videos/lista-videos.component';

// Services
import { ServerService } from './services/server.service';
import { PlayerService } from './services/player.service';
import { VideosService } from './services/videos.service';
import { YoutubeService } from './services/youtube.service';


@NgModule({
  declarations: [
    AppComponent,
    ListaVideosComponent,
    FilterInputPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    ServerService,
    PlayerService,
    VideosService,
    YoutubeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
