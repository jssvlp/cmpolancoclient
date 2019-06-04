import { SolicitudModel } from "./Solicitud.model";

export class UserModel {
    usuarioID:number;
    nombreUsuario: string;
    apellidosUsuario: string;
    correoUsuario: string;
    fechaNacimiento: Date;
    contraseña: string;
    adminAcces: boolean;
    fireBaseCode: string;
    solicitud: SolicitudModel;
    roleId: number;
  }