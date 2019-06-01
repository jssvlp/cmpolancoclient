import { UserModel } from "./User.model";

export class ComentarioModel{

    comentarioID: number
    publicacionID: number
    usuarioID: number
    textoComentario: string
    timeStampComment: Date
    urlImagen: string
    usuario: UserModel
}