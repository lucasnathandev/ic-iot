import { ISensorFields } from "./sensor-fields.interface";

export interface BoxDataProps {
  id: string;
  battery: number;
  date: Date;
  time: string;
  sensors: ISensorFields;
  boxId: string;
  customerId?: string;
}
