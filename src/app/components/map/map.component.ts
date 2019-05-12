import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 18.449569;
  lng: number = -69.967256;
  constructor() { }

  ngOnInit() {
  }

}
