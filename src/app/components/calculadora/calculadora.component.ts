import { Component, OnInit } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  public monto : number;
  public tasa : number;
  public tiempo: number;
  public result : string;
  public numerador: number;
  public denominador: number;
  public tasa2: number;
  public tiempo2: number;
  public moneda: string;
  

  

   

  public add(){
    this.tiempo2 = this.tiempo * 12;
    this.tasa2 = (this.tasa / 12) / 100
    this.numerador = (Math.pow(1 + this.tasa2, this.tiempo2)) * this.tasa2 
    this.denominador = (Math.pow(1 + this.tasa2, this.tiempo2)) - 1
    if (this.moneda=="DOP") {  
    this.result = ('RD$ ') + new Intl.NumberFormat().format(Math.round(((this.numerador/ this.denominador) * this.monto) * 100)/100);
    }
    else{
      this.result = ('US$ ') + new Intl.NumberFormat().format(Math.round(((this.numerador/ this.denominador) * this.monto) * 100)/100);
    }
  }

  

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >30) {
          $("#navbarSupportedContent").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
        }
        else{
          $("#navbarSupportedContent").css("background" , "transparent");

        }
      })
    })
    
  }

}