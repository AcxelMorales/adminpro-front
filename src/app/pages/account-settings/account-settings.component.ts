import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  ngOnInit(): void {
    this.onCheck();
  }

  constructor(private _service: SettingsService) { }

  public changeColor(color: string, link: any): void {
    this.addCheck(link);
    this._service.theme(color);
    this._service.saveSettings();
  }

  public addCheck(link: any): void {
    let selectores: any = document.getElementsByClassName('selector');

    for (const i of selectores) {
      i.classList.remove('working');
    }

    link.classList.add('working');
  }

  public onCheck(): void {
    let selectores: any = document.getElementsByClassName('selector');
    let theme = this._service.settings.tema;

    for (const i of selectores) {
      if (i.getAttribute('data-theme') === theme) {
        i.classList.add('working');
        break;
      }
    }
  }

}
