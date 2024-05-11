import ModbusRTU from "modbus-serial";
import { ExecutionResult, StepBody, StepExecutionContext } from "workflow-es";

export class IncrementOverflowRegister extends StepBody {
    public client: ModbusRTU = new ModbusRTU();
    public overflowRegister: number = 0;
    public overflowCount: number = 0;

    public run(context: StepExecutionContext): Promise<ExecutionResult> {
        console.log("Increment Overflow");
        this.overflowCount++;
        return ExecutionResult.next();
    }
}