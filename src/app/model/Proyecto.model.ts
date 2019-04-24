import { InmuebleModel } from "./Inmueble.model";

export class ProyectoModel {
    proyectoID: number;
    nombreProyecto: string;
    fechaTerminacion: Date;
    direccion: string;
    imgURL: string;
    ubicacionID: number;
    inmueble:InmuebleModel;
  }