import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit{
  name:any='Appareil';
  status:any='Status';
 constructor(private appareilService:AppareilService,
  private route:ActivatedRoute){

 }
 ngOnInit(){
   const id = this.route.snapshot.params['id'];
   this.name=this.appareilService.getAppareilById(+id)?.name;
   this.status=this.appareilService.getAppareilById(+id)?.status;
  }
}
