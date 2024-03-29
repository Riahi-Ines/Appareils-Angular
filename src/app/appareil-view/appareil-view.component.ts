import { Component ,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';
@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit{
  isAuth=false;

 /**lastUpdate = new Promise<Date>(
    (resolve,reject) => {
      const date = new Date();
      setTimeout(
        ()=>{                    
      resolve(date);
      return date;
     }, 2000);
    }
  )*/
 appareils:any[];
 appareilSubscription:Subscription;

  constructor(private appareilservice :AppareilService) {
    setTimeout(()=>{                    
      this.isAuth= true;
  }, 4000);
  }
 ngOnInit(){
    this.appareilSubscription=this.appareilservice.appareilSubject.subscribe(
      (appareils:any[])=>{
        this.appareils=appareils;
      }
    )
    this.appareilservice.emitAppareilSubject();
  }
 onAllumer(){
  this.appareilservice.switchOnAll();
  }
  onEteindre(){
    this.appareilservice.switchOffAll();
  }
  onSave(){
    this.appareilservice.saveAppareilToService();
  }
  onFetch(){
    this.appareilservice.getAppareilFromService();
  }
}
