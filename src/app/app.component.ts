import { environment } from './../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServerService } from './services/server.service';
import { PlayerService } from './services/player.service';
import { VideosService } from './services/videos.service';

// Pipes
import { FilterInputPipe } from './pipes/filterInputPipe';

declare var EventSource: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  // Player configurations from the API
  videoModes: any[] = [
    'windowed',
    'fullscreen',
    'chromecast',
    'audio only'
  ];

  // Server stats
  public serverStats: any = {};
  // Server stats
  public playerStats: any = {};

  // Player settings
  public player = {};

  // List of all videos from the API
  public videos = [];

  // Current selected video
  public currentVideo: any = {};

  // New video to be added thru <input>
  public videoURL: any;

  private EVENT_URL = environment.API + '/stats?type=player';
  private serverMessage: any = {};
  private eventSource: any;

  constructor(private changeDetector: ChangeDetectorRef,
    private serverService: ServerService,
    private playerService: PlayerService,
    private videosService: VideosService) { }

  ngOnInit() {
    this.getPlayer();
    this.getAllVideos();
    this.listenServerEvents();
    this.getServerStats();
  }

  listenServerEvents() {
    // Crea un nuevo objeto EventSource que viene de la API
    // Mantiene actualizado el número de turno desde el servidor
    this.eventSource = new EventSource(this.EVENT_URL, { withCredentials: false });

    // Para la oreja a los mensajes de servidor
    this.eventSource.onmessage = (evt) => {

      // Se actualiza el mensaje de servidor
      this.serverMessage = JSON.parse(evt.data);

      // Detector de cambios: Si el último mensaje de la API es diferente al previo, actualizar!
      if (!this.playerStats.last_updated || this.playerStats.last_updated !== this.serverMessage.last_updated) {
        this.playerStats = JSON.parse(this.serverMessage);
      }

      // Detectar cambios
      this.changeDetector.detectChanges();

    };
  }

  /**
   * Get server
   */
  getServerStats() {
    this.serverService.get({ type: 'server' }).subscribe(stats => {
      this.serverStats = stats;
    });
  }

  /**
   * Get player stats (current volume, last video, etc)
   */
  getPlayerStats() {
    this.serverService.get({ type: 'player' }).subscribe(stats => {
      this.playerStats = stats;
    });
  }

  /**
   * Get player configs and stats
   */
  getPlayer() {
    this.playerService.get(environment.PLAYER).subscribe(player => {
      this.player = player;
      this.getPlayerStats();
    });
  }

  /**
   * Get full list of videos
   */
  getAllVideos() {
    this.videosService.get({}).subscribe(videos => {
      this.videos = videos;
    });
  }

  /**
   * Play selected video by ID
   * @param id Redis or MongoDB video ID
   */
  play(id) {
    this.videosService.play(id).subscribe(playback => {
      this.currentVideo = playback;
    });
  }


  /**
   * Plays PLS file generated "on the fly"
   */
  playAll() {
    this.videosService.playAll().subscribe(playback => {
      this.currentVideo = playback;
    });
  }

  /**
   * Plays PLS file generated "on the fly"
   */
  stopAll() {
    this.videosService.stopAll().subscribe(playback => {
      this.currentVideo = playback;
    });
  }

  /**
   * Add video to the list of videos
   * @param youtubeURL Youtube URI or ID
   */
  addVideo() {
    const params = {
      video: this.videoURL
    };

    this.videosService.save(params).subscribe(video => {
      this.videos = [...this.videos, video];
      this.videoURL = '';
      this.getServerStats();
    });
  }

  isPlaying(id) {
    return false;
  }

  setVolume(type) {
    return type;
  }


  /**
   * Tools
   */

  // Initialize player settings
  updatePlayer() {
    const params = {
      player: 'mpv',
      player_mode: 'windowed',
      player_volume: 50,
      player_volume_step: 5,
      player_is_muted: false,
      player_playlist: '--playlist'
    };

    this.playerService.update(params).subscribe(player => {
      this.player = player;
    });

  }

  // Initializa server stats
  updateServerStats() {
    const params = {
      player: 'mpv',
      status: 'stopped',
      video_id: 'video2',
      last_updated: new Date()
    };

    this.serverService.update(params).subscribe(stats => {
      this.serverStats = stats;
    });
  }

}
