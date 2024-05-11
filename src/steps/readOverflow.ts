import ModbusRTU from "modbus-serial";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";

export class ReadOverflowRegister extends StepBody {
    public client: ModbusRTU = new ModbusRTU();
    public overflowRegister: number = 40010;
    public overflowCount: number = 0;

    public async run(context: StepExecutionContext): Promise<ExecutionResult> {
        console.log("Read Overflow Register");
        const overflowCounter = await this.client.readHoldingRegisters(this.overflowRegister, 1);
        console.log(overflowCounter);
        this.overflowCount = overflowCounter.buffer.readUint16BE(0);
        console.log(`Overflow Count: ${this.overflowCount}`);
        return ExecutionResult.next();
    }
}