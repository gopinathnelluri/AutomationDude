import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Rpa } from '../type/rpa';

@Component({
  selector: 'app-rpas',
  templateUrl: './rpas.component.html',
  styleUrls: ['./rpas.component.scss']
})
export class RpasComponent implements OnInit {

  progress: boolean = false;
  isFormInValid: boolean = false;
  isFormInValidForRPAs: any = {}

  newRPA: Rpa = {
    BotName: "",
    BotID: "",
  }

  RPAs?: Rpa[] = [];

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.getRPAs();
  }


  addRPA(){
    if(this.newRPA.BotName && this.newRPA.BotID){
      this.configService.addRPA({
        BotID: this.newRPA.BotID,
        BotName: this.newRPA.BotName
      }).subscribe((updated) => {
        this.resetForm();
      })
    } else {
      this.isFormInValid = true;
    }
  }

  getRPAs(){
    this.configService.getConfig().subscribe((config) => {
      this.RPAs = config.rpas;
    })
  }

  resetForm(){
    this.newRPA.BotName = "";
    this.newRPA.BotID = "";
    this.resetError();
  }

  resetError(){
    this.isFormInValid = false;
  }

  updateRPA(i: number){
    if(!this.resetErrorForRPA(i)){
      this.configService.updateRPA(i, {
        BotName: this.RPAs ? this.RPAs[i].BotName : "Error",
        BotID: this.RPAs ? this.RPAs[i].BotID :  "Error"
      })
    }
  }

  deleteRPA(i: number){
    this.configService.deleteRunner(i);
  }

  resetErrorForRPA(i: number){
    if(this.RPAs){
      if(this.RPAs[i].BotID && this.RPAs[i].BotName){
        this.isFormInValidForRPAs[i] = false;
      } else {
        this.isFormInValidForRPAs[i] = true;
      }
    }
    return this.isFormInValidForRPAs[i];
  }
}
