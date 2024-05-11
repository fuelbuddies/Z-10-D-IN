import ModbusRTU from "modbus-serial";
import { DispenserOptions } from "./utils/dispenserOptions";

export class Seneca {
  public client: ModbusRTU;
  public timeout: number;
  public address: string = "COM9";
  public baudRate: number;
  public deviceId: number;
  public overflowCount: number = 0;
  public pulseCount: number = 0;
  public previousPulseCount: number = 0;

  public overflowRegister: number = 8; // 16-bit register that increments every time the pulse counter overflows
  public pulseRegister: number = 10; // 16-bit register that increments every time the pulse counter overflows

  constructor(options: DispenserOptions) {
    this.client = new ModbusRTU();
    this.timeout = options.timeout || 1000;
    this.baudRate = options.baudRate || 9600;
    this.deviceId = options.deviceId || 1;
    this.overflowRegister = options.overflowRegister || 8;
    this.pulseRegister = options.pulseRegister || 10;
  }
}