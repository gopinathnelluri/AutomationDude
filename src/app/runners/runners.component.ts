import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Runner } from '../type/runner';

@Component({
  selector: 'app-runners',
  templateUrl: './runners.component.html',
  styleUrls: ['./runners.component.scss']
})
export class RunnersComponent implements OnInit {

  progress: boolean = false;
  isFormInValid: boolean = false;
  isFormInValidForRunners: any = {}

  newRunner: Runner = {
    controlRoomURL: "",
    username: "",
    password: ""
  }

  runners?: Runner[] = [];

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.getRunners();
  }


  addDevice(){
    if(this.newRunner.controlRoomURL && this.newRunner.username && this.newRunner.password){
      this.configService.addRunner({
        controlRoomURL: this.newRunner.controlRoomURL,
        username: this.newRunner.username,
        password: this.newRunner.password
      }).subscribe((updated) => {
        this.resetForm();
      })
    } else {
      this.isFormInValid = true;
    }
  }

  getRunners(){
    this.configService.getConfig().subscribe((config) => {
      this.runners = config.runners;
    })
  }

  resetForm(){
    this.newRunner.controlRoomURL = "";
    this.newRunner.username = "";
    this.newRunner.password = "";
    this.resetError();
  }

  resetError(){
    this.isFormInValid = false;
  }

  updateRunner(i: number){
    if(!this.resetErrorForRunner(i)){
      this.configService.updateRunner(i, {
        controlRoomURL: this.runners ? this.runners[i].controlRoomURL : "Error",
        username: this.runners ? this.runners[i].username :  "Error",
        password: this.runners ? this.runners[i].password :  "Error"
      })
    }
  }

  deleteRunner(i: number){
    this.configService.deleteRunner(i);
  }

  resetErrorForRunner(i: number){
    if(this.runners){
      if(this.runners[i].controlRoomURL && this.runners[i].username && this.runners[i].password){
        this.isFormInValidForRunners[i] = false;
      } else {
        this.isFormInValidForRunners[i] = true;
      }
    }
    return this.isFormInValidForRunners[i];
  }
}
