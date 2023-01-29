import { SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService{
appareilSubject=new Subject<any[]>;

private appareils = [
        {
          id: 1,
          name:'MM1',
          status:'eteint'
    
        },
        {
          id: 2,
          name:'MM2',
          status:'allumé'
    
        },
        {
          id : 3,
          name:'MM3',
          status:'allumé'
    
        }
      ]
      constructor(private httpClient:HttpClient){

      }
      emitAppareilSubject(){
        this.appareilSubject.next(this.appareils.slice());/**slice pour emettre une copie */
      }
      getAppareilById(id:number){
        const appareil=this.appareils.find(
          (appareilObject)=>{
            return appareilObject.id ==id;
          }
        );
        return appareil;
      }
      switchOnAll(){
        for(let appareil of this.appareils){
            appareil.status='allumé'
        }
        this.emitAppareilSubject();
    }
      switchOffAll(){
            for(let appareil of this.appareils){
                appareil.status='eteint'
            }
            this.emitAppareilSubject();
      }
      switchOnOne(index:number){
        this.appareils[index].status='allumé';
        this.emitAppareilSubject();
      }

      switchOffOne(index:number){
        this.appareils[index].status='eteint';
        this.emitAppareilSubject();
      }

      addAppareil(name:string,status:string){
        const appareilObject={
          id:0,
          name:'',
          status:''
        }
        appareilObject.name=name;
        appareilObject.status=status;
        appareilObject.id =this.appareils[(this.appareils.length-1)].id+1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
      }
      saveAppareilToService(){
        this.httpClient.
        put('https://http-client-demo-70538-default-rtdb.firebaseio.com/appareil.json',this.appareils)
        .subscribe(
          ()=>{
            console.log('Enregistrement Terminer !')
          },()=>{
            console.log('Erreur de sauvegarde !'+console.error);
          }
            )
         }
         getAppareilFromService(){
          this.httpClient.
          get<any[]>('https://http-client-demo-70538-default-rtdb.firebaseio.com/appareil.json')
          .subscribe(
            (response)=>{
              this.appareils=response;
              this.emitAppareilSubject();
            },(error)=>{
              console.log('Erreur de chargement !'+error);
            }
              )
           }
}    