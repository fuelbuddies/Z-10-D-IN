export type DispenserOptions = {
    dispenserType: string;
    hardwareId: string;
    attributeId: string;
    baudRate?: number;
    kFactor?: number
    printer?: PrinterOptions;
};

export type PrinterOptions = {
    printerType: string;
    hardwareId: string;
    attributeId: string;
    baudRate?: number;
  };