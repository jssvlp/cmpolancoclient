import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-chatb',
  templateUrl: './chatb.component.html',
  styleUrls: ['./chatb.component.css']
})
export class ChatbComponent implements OnInit {
  latitude:any;
  longitude:any;
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >10) {
          $("#navbarSupportedContent").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
        }
        else{
          $("#navbarSupportedContent").css("background" , "transparent");

        }
      })
    })
  }

}
