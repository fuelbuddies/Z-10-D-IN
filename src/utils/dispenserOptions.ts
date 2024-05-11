export type DispenserOptions = {
    dispenserType: string;
    hardwareId: string;
    attributeId: string;
    baudRate?: number;
    kFactor?: number;
    timeout: number;
    printer?: PrinterOptions;
    deviceId: number;
    overflowRegister: number;
    pulseRegister: number;
};

export type PrinterOptions = {
    printerType: string;
    hardwareId: string;
    attributeId: string;
    baudRate?: number;
  };