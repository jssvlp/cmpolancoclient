import { Component, OnInit } from '@angular/core';
import { GenericdataService } from 'src/app/services/genericdata.service';
import { GenericData } from 'src/app/model/GenericData.model';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from '@angular/core/src/render3';
import config from '../../../config.js';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  latitude:string;
  longitude:string;
  year:number;
  genericData: GenericData[] = [];
  fileserver: string;
  constructor(private GenericDataService:GenericdataService) { }

  ngOnInit() {
    this.fileserver = config.fileserver
    this.getYear();
    this.GenericDataService.getAllGenericData().subscribe(res => {
      this.genericData = res;
      
      this.latitude = this.getGenericDataByKey('latitude-ubicacion');
      this.longitude = this.getGenericDataByKey('longitude-ubicacion');

      if(this.latitude != undefined || this.latitude != null)
      {
        localStorage.setItem('latitude', this.latitude.toString());
        localStorage.setItem('longitude', this.longitude.toString());
        
      } 
      }); 
  }

  getGenericDataByKey(key){
    let value;
    for(let i = 0; i < this.genericData.length; i++){
      if(this.genericData[i]['key'] == key){
          value = this.genericData[i]['value']
      }
    }
    return value;
  }

  getYear(){
    var d = new Date();
    this.year = d.getFullYear();
  }

}
