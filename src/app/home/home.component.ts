import { Component, OnInit } from '@angular/core';
declare var Jquery: any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.carousel').carousel({
      interval: 6000,
      pause: "false"
    });

    // $(document).ready(function(){
    //   $('.navbar-light .navbar-nav .nav-link').each(function(index, elemento){
    //     $(this).css({
    //       'top': '-200px'
    //     });
    //     $(this).animate({
    //       top:'0'
    //     }, 2000 + (index * 500));
    //   });
    // });
  
    
  }

}
