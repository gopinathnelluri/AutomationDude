import { Injectable } from '@angular/core';
import { BehaviorSubject, first, last, Observable, of, Subject } from 'rxjs';
import { Config } from './type/config';
import { Rpa } from './type/rpa';
import { Runner } from './type/runner';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: Config = {
    runners: [],
    rpas: []
  }

  configSubject: BehaviorSubject<Config> = new BehaviorSubject(this.config);

  constructor() {
  }

  load(){
    if(!(this.config && this.config.runners && this.config.runners.length > 0
      && this.config.rpas && this.config.rpas.length > 0)){
       let tempConfig = this.getData();
       console.log('loaded', tempConfig);
       if(tempConfig){
         this.configSubject.next(JSON.parse(tempConfig));
       }
   }
  }

  getConfig(){
    return this.configSubject.asObservable();
  }

  updateConfig(configData: Config){
    if(!configData.rpas){
      // configData.rpas = [];
      alert("Not in proper format!!");
    } else if(!configData.runners){
      // configData.runners = [];
      alert("Not in proper format!!");
    } else if(configData && configData.rpas && configData.runners){
      console.log("check", configData)
      this.config = configData;
      this.setData(configData); 
    }
  }

  // Runner

  addRunner(newRunner: Runner): Observable<boolean>{
    let updated: Subject<boolean> = new Subject();
    this.configSubject.asObservable().pipe(first()).subscribe((config) => {
      if(config.runners && config.runners.length >= 0){
        config.runners.push(newRunner);
      } else {
        config.runners = [newRunner];
      }
      this.config = config;
      this.setData(config); 
      updated.next(true);
    });
    return updated;
  }

  deleteRunner(runnerID: number){
    this.configSubject.asObservable().pipe(first()).subscribe((config) => {
      if(config.runners){
        config.runners.splice(runnerID, 1);
      } 
      this.config = config;
      this.setData(config);
    });
  }

  updateRunner(runnerID: number, runner: Runner){
    this.configSubject.asObservable().pipe(first()).subscribe((config) => {
      if(config.runners){
        config.runners[runnerID] = runner;
      }
      this.config = config;
      this.setData(config);
    });
  }

  // RPA

  addRPA(newRPA: Rpa): Observable<boolean>{
    let updated: Subject<boolean> = new Subject();
    this.configSubject.asObservable().pipe(first()).subscribe((config) => {
      if(config.rpas && config.rpas.length >= 0){
        config.rpas.push(newRPA);
      } else {
        config.rpas = [newRPA];
      }
      this.config = config;
      this.setData(config); 
      updated.next(true);
    });
    return updated;
  }

  deleteRPA(rpaID: number){
    this.configSubject.asObservable().pipe(first()).subscribe((config) => {
      if(config.rpas){
        config.rpas.splice(rpaID, 1);
      } 
      this.config = config;
      this.setData(config);
    });
  }

  updateRPA(rpaID: number, rpa: Rpa){
    this.configSubject.asObservable().pipe(first()).subscribe((config) => {
      if(config.rpas){
        config.rpas[rpaID] = rpa;
      }
      this.config = config;
      this.setData(config);
    });
  }

  // local storage

  setData(config: any) {
    console.log("change", config);
    const configData = JSON.stringify(config)
    localStorage.setItem('configData', configData);
    this.configSubject.next(config);
  }
 
  getData() {
    return localStorage.getItem('configData');
  }
 
  removeData() {
    localStorage.removeItem("configData");
  }
}
