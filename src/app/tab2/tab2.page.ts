import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms';
import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  ///formulario para agregar
  ContactForm: FormGroup;

  constructor( private contactService: CrudService, private router: Router,public fb: FormBuilder) { }
   //funcion para acceder a los controles del form o formulario
   get f() { return this.ContactForm.controls; }
  ///inicializo un nuevo elemento para crear nuevo contacto
  ngOnInit() {
    this.ContactForm = this.fb.group({   
      name: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]], 
      mobile: ['', [Validators.minLength(10),Validators.required]],
    });
    this.ContactForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: ['']
    })
  }
  //funcion para registrar el nuevo contacto
  formSubmit() {
    ///valido el formulario
    if (!this.ContactForm.valid) {
      return false;
    } else {
      ///crear contacto
      this.contactService.createContact(this.ContactForm.value).then(res => {
        console.log(res)
        //limpio formulario
        this.ContactForm.reset();
        ///redirecciono a la pagina donde se muestran los contactos
        this.router.navigate(['/tabs/tab1']);
      })
        .catch(error => console.log(error));
    }
  }





  /*
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
  }*/
}
