import { IPassenger } from "./passenger.interface";

//TODO: NO SE HEREDA DE DOCUMENT PROQUE NO SE USA PARA ESQUEMAS DE MONGOOSE
export interface IFlight{
    pilot: string;
    airplane: string;
    destinationCity: string;
    flightDate: Date;
    passengers:IPassenger[];
}