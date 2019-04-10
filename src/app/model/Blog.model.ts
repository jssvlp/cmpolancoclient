import { UserModel } from "./User.model";

export class BlogModel {
  blogID: number
  tituloEntrada: string
  textoEntrada: string
  imgUrl: string
  usuario: UserModel
  usuarioID: number
  timestampBlog: Date
}
