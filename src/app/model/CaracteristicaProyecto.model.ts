import { ProyectoModel } from "./Proyecto.model";
import { CaracteristicaModel } from "./Caracteristica.model";

export class CaracteristicaProyectoModel {
    proyectoID: number
    caracteristicaID: number
    proyecto:ProyectoModel
    caracteristica: CaracteristicaModel
}