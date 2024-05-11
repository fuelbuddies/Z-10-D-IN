import ModbusRTU from "modbus-serial";

export class Seneca {
  public client: ModbusRTU = new ModbusRTU();
  public timeout: number = 1000;
  public address: string = "COM9";
  public id: number = 1;
  public overflowCount: number = 0;
  public pulseCount: number = 0;
  public previousPulseCount: number = 0;

  public overflowRegister: number = 8; // 16-bit register that increments every time the pulse counter overflows
}