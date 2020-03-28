import { Component, OnInit} from '@angular/core';
///se agregaron estos dos imports
import { NavController } from '@ionic/angular';
import {FormBuilder,FormGroup,Validators ,FormControl,AbstractControl,ValidatorFn} from '@angular/forms';
///import para navegar entre ventanas
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  myForm: FormGroup;
  password1 = 'password'
  password2 = 'passwordrepeat'
  constructor(private authSvc:AuthService,private router:Router,private alertCtrl: AlertController,public navCtrl: NavController,public fb: FormBuilder) {
    
    this.myForm = this.fb.group({
      //name: ['', [Validators.required]],
      //company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      //age: ['', [Validators.required]],
      //url: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
      password: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.minLength(5),
      Validators.required]],
      confirmPassword: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.minLength(5),
      Validators.required]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  ngOnInit(): void {
    ///throw new Error("Method not implemented.");
  }
  get f() { return this.myForm.controls; }
  async Registrarse(){
    try{
      //console.log("email:"+this.myForm.value.email+" pass:"+this.myForm.value.password);
      ////se accede al login enviando el modelo de form email y password
      this.authSvc.doRegister(this.myForm.value).then(res=>{
        ///si el login es true se abre la ventana
        console.log(res);
        if(res){
          this.myForm.reset();
          this.router.navigateByUrl('/');
        }
      }, async err =>{
        console.log(err);
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials.',
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
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}