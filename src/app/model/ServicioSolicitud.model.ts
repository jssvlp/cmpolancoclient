import { ServicioModel } from "./Servicio.model";
import { SolicitudModel } from "./Solicitud.model";
import { EstadoModel } from "./Estado.model";

export class ServicioSolicitudModel {

    servicio: ServicioModel
    servicioID: number
    solicitud: SolicitudModel
    solicitudID:number
    estado: EstadoModel
    estadoID:number
    
  }