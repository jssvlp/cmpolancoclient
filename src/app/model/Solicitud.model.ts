import { VisitaModel } from "./Visitas.model";

export class SolicitudModel {
    solicitudID: number
    fechaSol: Date
    fechaServSol: Date
    usuarioID:number
    comentario:string
    Visitas: VisitaModel
    usuario:any;
  }