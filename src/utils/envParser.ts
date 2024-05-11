import { DispenserOptions } from "./dispenserOptions";

export function getConfigFromEnv() {
    const dispenserConfig: DispenserOptions = {
        dispenserType: process.env.VITE_MAIN_DISPENSER_TYPE || '',
        hardwareId: process.env.VITE_MAIN_DISPENSER_HARDWARE_ID || '',
        attributeId: process.env.VITE_MAIN_DISPENSER_ATTRIBUTE_ID || '',
        baudRate: parseInt(process.env.VITE_MAIN_DISPENSER_BAUD_RATE || '0'), // Parse as integer
    };

    // Optionally, you can add more properties to the object if they exist in the environment variables
    if (process.env.VITE_MAIN_DISPENSER_K_FACTOR) {
        dispenserConfig.kFactor = Number(process.env.VITE_MAIN_DISPENSER_K_FACTOR);
    }

    if(process.env.VITE_MAIN_PRINTER_TYPE) {
        dispenserConfig.printer = {
            printerType: process.env.VITE_MAIN_PRINTER_TYPE,
            hardwareId: process.env.VITE_MAIN_PRINTER_HARDWARE_ID || '',
            attributeId: process.env.VITE_MAIN_PRINTER_ATTRIBUTE_ID || '',
            baudRate: parseInt(process.env.VITE_MAIN_PRINTER_BAUD_RATE || '9600')
        };
    }

    return dispenserConfig;
}