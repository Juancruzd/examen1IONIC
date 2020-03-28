import { Component } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  
  uno = '/assets/img/numeros/1.jpg';
  dos = '/assets/img/numeros/2.jpg';
  tres = '/assets/img/numeros/3.jpg';
  cuatro = '/assets/img/numeros/4.jpg';
  constructor() { }
  

  unoplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/numeros/1.mp3";
    audio.load();
    audio.play();
  }
  dosplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/numeros/2.mp3";
    audio.load();
    audio.play();
  }
  tresplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/numeros/3.mp3";
    audio.load();
    audio.play();
  }
  cuatroplay() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/numeros/4.mp3";
    audio.load();
    audio.play();
  }
  
}
