import { Component, OnInit, Input, NgZone } from '@angular/core';
import {} from "googlemaps";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public zoom: number;


  constructor() {
    }
  @Input() public latitude: number;
  @Input() public longitude: number;
    
  @Input()
  public customTitle: string;
    
  ngOnInit() {
    this.zoom = 14;
  }
  ngOnChanges(){
   
    this.latitude = parseFloat(localStorage.getItem('latitude'));
    this.longitude = parseFloat(localStorage.getItem('longitude'));
    //console.log('latitude :', localStorage.getItem('latitude'));
    //console.log('longitude :', localStorage.getItem('longitude'));
  }
  


}
