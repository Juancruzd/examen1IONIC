import { Component, OnInit  } from '@angular/core';
import { Contact } from '../shared/Contact';
import { CrudService } from './../services/crud.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  Contacts = []; 
  constructor( private contactService: CrudService ) { } 
  ///Metodo de inicializacion donde obtengo los actuales contactos al momento de carga de la pagina
  ngOnInit() {
    //inicializo la lista de contactos
    this.fetchContacts();
    //obtengo la lista de contacos
    let bookingRes = this.contactService.getContactList();
    ///accedo a los contactos
    bookingRes.snapshotChanges().subscribe(res => {
      ///limpio el arreglo
      this.Contacts = [];
      ///atravez de un ciclo ingreso los datos al arreglo de contactos
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        ///ingeso objeto
        this.Contacts.push(a as Contact);
      })
    })
  }
  //funcion para inicializar la lista de contactos
  fetchContacts() {
    this.contactService.getContactList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }
  ///funcion para eliminar contacto por id
  deleteContact(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.contactService.deleteContact(id)
    }
  }
  






  /*
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
*/  
}
