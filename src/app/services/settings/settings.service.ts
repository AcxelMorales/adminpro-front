import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.getSettings();
  }

  saveSettings(): void {
    localStorage.setItem('stt', JSON.stringify(this.settings));
  }

  getSettings(): void {
    if (localStorage.getItem('stt')) {
      this.settings = JSON.parse(localStorage.getItem('stt'));
      this.theme(this.settings.tema);
    } else {
      this.theme(this.settings.tema);
    }
  }

  theme(color: string): void {
    let url = `assets/css/colors/${color}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settings.temaUrl = url;
    this.settings.tema = color;
  }

}

interface Settings {

  temaUrl: string;
  tema: string;

};