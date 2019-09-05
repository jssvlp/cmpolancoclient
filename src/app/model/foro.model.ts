import { UserModel } from "./User.model";
import { ComentarioModel } from "./comentario.model";

export class ForoModel{

     publicacionID: number
     tituloPublicacion: string
     textoPublicacion: string
     timeStampForo: Date
     archivado: Boolean
     urlImagen: string
     usuarioID: number
     usuario: any
     temaID: number
     cometariosForos: ComentarioModel[]
    }