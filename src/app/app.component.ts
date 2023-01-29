import { Component,OnDestroy,OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  secondes:number;
  counterSubscription:Subscription;/** mettre dans un objet de typye subscription au lieu
  d'utiliser la methode directement --infinie-- bugs */
  constructor(){}

  ngOnInit(){
  
  const counter = interval(1000);/**Emits incremental numbers periodically in time */
  this.counterSubscription=counter.subscribe(
    (value:number)=>{
      this.secondes=value;
    }
  )
  /** counter.subscribe (
    (value:number) => {
      this.secondes=value;
    },
    (error: any)=>{
      console.log("Une erreur a été rencontrée");
    },
     () =>{
        console.log("Observable complétée");
      }
    
    )*/
  }
 ngOnDestroy() {
   this.counterSubscription.unsubscribe();/** Pour faire la destruction du compteur*/
 }
}
