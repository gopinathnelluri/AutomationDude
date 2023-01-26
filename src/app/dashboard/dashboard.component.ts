import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpService } from '../http.service';
import { Rpa } from '../type/rpa';
import { Runner } from '../type/runner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  progress: boolean = false;

  runners?: Runner[] = [];
  rpas?: Rpa[] = [];

  constructor(private configService: ConfigService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.getRunners();
  }

  getRunners(){
    this.configService.getConfig().subscribe((config) => {
      this.runners = config.runners;
      this.rpas = config.rpas;
    })
  }

  runBOT(BotID: String, runner: Runner){
    this.httpService.authenticateRunner(runner.controlRoomURL, runner.username, runner.password).subscribe(data => {
      console.log(data);
    });
  }

}
