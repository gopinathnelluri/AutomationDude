import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfigService } from '../config.service';
import { Config } from '../type/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  downloadUrl?: SafeUrl;

  constructor(private sanitizer: DomSanitizer, private configService: ConfigService) { }

  ngOnInit(): void {
    this.getConfig();
  }

  getConfig(){
    this.configService.getConfig().subscribe((config) => {
      let configContent = JSON.stringify(config, null, "\t");
      this.downloadUrl  = this.sanitizer.bypassSecurityTrustUrl(
        "data:text/json;charset=UTF-8," + encodeURIComponent(configContent)
      );
    })
  }

  uploadFile(event: Event){
    const element = event.target as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      // Create a new FileReader() object
      let reader = new FileReader();
      // Setup the callback event to run when the file is read
	    reader.onload = (event: any) => {
        let str = event.target.result;
        let configData = JSON.parse(str);
        this.configService.updateConfig(configData);
      }
      // Read the file
      reader.readAsText(fileList[0]);
    }
  }
}
