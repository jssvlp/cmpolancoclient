import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  latitude:number = 18.449742;
  longitude:number = -69.967246;

  constructor() { }

  ngOnInit() {
  }

}
