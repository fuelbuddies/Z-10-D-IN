import ModbusRTU from "modbus-serial";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";

export class ReadOverflowRegister extends StepBody {
    public client: ModbusRTU = new ModbusRTU();
    public overflowRegister: number = 0;
    public overflowCount: number = 0;

    public async run(context: StepExecutionContext): Promise<ExecutionResult> {
        console.log("Read Overflow Register");
        // const overflowCounter = await this.client.readHoldingRegisters(this.overflowRegister, 1);
        // this.overflowCount = overflowCounter.buffer.readUint32BE(0);
        return ExecutionResult.next();
    }
}