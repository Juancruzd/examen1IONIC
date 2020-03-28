import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  a = '/assets/img/letras/a.jpg';
  e = '/assets/img/letras/e.jpg';
  i = '/assets/img/letras/i.jpg';
  o = '/assets/img/letras/o.jpg';
  constructor() {}
  aplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/letras/a.mp3";
    audio.load();
    audio.play();
  }
  eplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/letras/e.mp3";
    audio.load();
    audio.play();
  }
  iplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/letras/i.mp3";
    audio.load();
    audio.play();
  }
  oplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/letras/o.mp3";
    audio.load();
    audio.play();
  }
}
