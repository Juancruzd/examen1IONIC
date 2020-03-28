import { Component, OnInit } from '@angular/core';
///se agregaron estos dos imports
import { NavController } from '@ionic/angular';
import {FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms';
///import para navegar entre ventanas
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngOnInit() {
    console.log("iniciar");
  }
  myForm: FormGroup;
  constructor(private authSvc:AuthService,private router:Router,private alertCtrl:AlertController,public navCtrl: NavController,public fb: FormBuilder) {
    authSvc.ofAuth.authState.subscribe(auth  =>{
      if (auth) {  
      this.router.navigateByUrl('/members');
     } 
    }); 


    this.myForm = this.fb.group({
      //name: ['', [Validators.required]],
      //company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      //age: ['', [Validators.required]],
      //url: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
      password: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.minLength(5),
      Validators.required]],
    });
  }
  ///^[a-z0-9_-]{6,18}$/
  //^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$
  //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')

  async IniciarSesion(){
    try{
      
      //console.log("email:"+this.myForm.value.email+" pass:"+this.myForm.value.password);
      ////se accede al login enviando el modelo de form email y password
      this.authSvc.doLogin(this.myForm.value).then(res=>{
        ///si el login es true se abre la ventana 
        if(res){
          this.myForm.reset();
        this.router.navigateByUrl('/members');
        }
      }, async err =>{ 
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: err,
          buttons: ['OK']
        });
        await alert.present();
      });

      
    
    //alert(JSON.stringify());
    }
    catch(error){
      console.log('error en login'+error)
    }
  }

  managePassword(input: any,icon: any,): any {
    //input.type = input.type == 'password' ?  'text' : 'password';
      if (input.type == 'text') {
        input.type ='password';
        icon.name='eye-off-outline';
      }else {
      input.type ='text';
      icon.name='eye-outline';
      }
  }

}
