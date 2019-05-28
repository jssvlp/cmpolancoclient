import { InmuebleModel } from "./Inmueble.model";

export class ProyectoModel {
    proyectoID: number;
    nombreProyecto: string;
    fechaTerminacion: Date;
    direccion: string;
    imgURL: string;
    inmueble:InmuebleModel;
    latitude: number;
    longitude: number;
  }