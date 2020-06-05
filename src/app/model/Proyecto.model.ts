import { InmuebleModel } from "./Inmueble.model";
import { ImagenesMultiples } from "./imagenesMultiple.model";

export class ProyectoModel {
    proyectoID: number;
    nombreProyecto: string;
    fechaTerminacion: Date;
    direccion: string;
    imgURL: string;
    inmueble:InmuebleModel;
    latitude: number;
    longitude: number;
    documentoResumenPdf:string;
    imagenes: ImagenesMultiples;
    inmuebles: InmuebleModel[];
  }