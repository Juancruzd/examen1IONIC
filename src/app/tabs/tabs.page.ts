import { Component } from '@angular/core';
///import para navegar entre ventanas
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage { 
  email:any=""
  constructor(private authSvc:AuthService,private router:Router,private alertCtrl:AlertController) {
    //console.log(this.authSvc.ofAuth.auth.currentUser.email);

    authSvc.ofAuth.authState.subscribe(auth  =>{
      if (auth) { 
        this.email=auth.email; 
     }
     else{
      this.email= "";
      this.router.navigateByUrl('/');
     }
    }); 
  }
  async logout(){
    try{
      
      //console.log("email:"+this.myForm.value.email+" pass:"+this.myForm.value.password);
      ////se accede al login enviando el modelo de form email y password
      
      this.authSvc.doLogout().then(res=>{
        ///si el login es true se abre la ventana
        this.router.navigateByUrl('/');
      }, async err =>{
        const alert = await this.alertCtrl.create({
          header: 'Logout Failed',
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
}
