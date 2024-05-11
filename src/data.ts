import ModbusRTU from "modbus-serial";

export class Seneca {
  public client: ModbusRTU = new ModbusRTU();
  public timeout: number = 1000;
  public address: string = "COM9";
  public id: number = 1;
}