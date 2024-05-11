import ModbusRTU from "modbus-serial";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";

export class ReadPulseCounter extends StepBody {
    public client: ModbusRTU = new ModbusRTU();
    public pulseRegister: number = 0;
    public pulseCount: number = 0;
    public previousPulseCount: number = 0;

    public async run(context: StepExecutionContext): Promise<ExecutionResult> {
        const pulseCounter = await this.client.readHoldingRegisters(this.pulseRegister, 2);
        this.previousPulseCount = this.pulseCount;
        this.pulseCount = pulseCounter.buffer.readUInt32BE(0);
        return ExecutionResult.next();
    }
}