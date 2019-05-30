import { UserModel } from "./User.model";

export class ForoModel{

     publicacionID: number
     tituloPublicacion: string
     textoPublicacion: string
     timeStampForo: Date
     archivado: Boolean
     urlImagen: string
     usuarioID: number
     usuario: UserModel
     temaID: number
    }