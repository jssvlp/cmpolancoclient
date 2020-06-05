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
  public banks: Array<any>;
  


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
/**
 * 
 * <a  target="blank" href="">  </a>  <br>
  <a  target="blank" href="">  </a> <br>
  <a  target="blank" href="">  </a> <br>
  <a  target="blank" href=""> </a> <br>
  <a  target="blank" href="">  </a> <br>
 */
  ngOnInit() {
    this.banks = [
      {
        url : "https://www.popularenlinea.com/Personas/Paginas/nosotros/pistas-financieras.aspx",
        name : "Popular"
      },
      {
        url: "https://www.banreservas.com/calculators/hipotecarios",
        name: "Ban Reservas"
      },
      {
        url: "https://www.bhdleon.com.do/wps/portal/BHD/Inicio/bancapersona/Prestamos/!ut/p/z0/fY3LCsIwEEV_xU3WEyUKXRbFNwgVoZ2NTNNgx0cmTYL4-Xbpyt09cDgXEGpAT2--UWbx9By5wcXVFCu9M2Z62GzXWpez47w4V6dqeTGwB_wvjAW-DwOWgFZ8dp8Mddt3SrNny6J0S97SJLiYxkelQ3Qp00vSz-w5SHaWIkuC8MDmCyVwSnk!/",
        name: "BHD León"
      },
      {
        url: "https://www.progreso.com.do/personas/herramientas/calculadora-de-prestamos/",
        name: "Banco del Progreso "
      },
      {
        url: "https://www.bancocaribe.com.do/prestamo/personas/prestamos-hipotecarios",
        name: "Ban Reservas"
      },
      {
        url: "https://www.banreservas.com/calculators/hipotecarios",
        name: "Banco Caribe"
      },
      {
        url: "https://www.bsc.com.do/",
        name: "Banco Santa Cruz"
      },
      {
        url: "https://www.bdi.com.do/Prestamos/Calculadora-de-Prestamos",
        name: "BDI"
      },
      {
        url: "https://www.blh.com.do/herramientas/calculadoras/calculadora-prestamos-hipotecarios/",
        name: "López de Haro"
      },
      {
        url: "https://www.bellbank.com/calculator-financial/102/",
        name: "Banco Múltiple Bellbank"
      },
      {
        url: "https://www.promerica.com.do/",
        name: "Banco Promerica"
      },
      {
        url: "https://www.banesco.com.do/prestamos/vivienda",
        name: "Banesco"
      },
      {
        url: "https://confisa.do/calculadora/",
        name: "Banco Confisa"
      },
      {
        url: "https://bancoademi.com.do/pr%C3%A9stamos-personales/pr%C3%A9stamo-hipotecario/",
        name: "Ademi"
      },
      {
        url: "https://www.bancounion.com.do/banca-personal/prestamos-hipotecarios/",
        name: "Banco Unión"
      },
      {
        url: "https://bancoadopem.com.do/",
        name:"Banco Adopem"
      }

    ];
    /* $(document).ready(function(){
      $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll >30) {
          $("#navbarSupportedContent").css("background" , "linear-gradient(to bottom, #2c2a22  0%, #2c2a22 100%)");
        }
        else{
          $("#navbarSupportedContent").css("background" , "transparent");

        }
      })
    }) */
    
  }

}
