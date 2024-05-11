import { WorkflowBase, WorkflowBuilder, WorkflowErrorHandling } from "workflow-es";
import { Seneca } from "./data";
import { GoodbyeWorld } from "./steps/goodbye";
import { HelloWorld } from "./steps/hello";
import { InitializeSeleca } from "./steps/connect";
import ModbusRTU from "modbus-serial";
import { ReadOverflowRegister } from "./steps/readOverflow";
import { ReadPulseCounter } from "./steps/countPulse";
import { IncrementOverflowRegister } from "./steps/incrementOverflow";

export class Z10DIN_Workflow implements WorkflowBase<Seneca> {
    public id: string = "z10d1n-world";
    public version: number = 1;

    public build(builder: WorkflowBuilder<Seneca>) {        
        builder
        .startWith(HelloWorld)
        .saga((sequence) => sequence
        .startWith(InitializeSeleca)
            .input((step, data) => step.id = data.id)
            .input((step, data) => step.timeout = data.timeout)
            .input((step, data) => step.address = data.address)
            .input((step) => step.client = new ModbusRTU())
            .output((step, data) => data.client = step.client)
        .then(ReadOverflowRegister)
            .input((step, data) => step.client = data.client)
            .input((step, data) => step.overflowRegister = data.overflowRegister)
            .output((step, data) => data.overflowCount = step.overflowCount))
        // Overflow register is a 32-bit register that increments every time the pulse counter overflows
        .while((data) => data.overflowCount < 65535).do((sequence) => sequence
            .startWith(ReadPulseCounter)
                .input((step, data) => step.client = data.client)
                .output((step, data) => data.pulseCount = step.pulseCount)
                .output((step, data) => data.previousPulseCount = step.previousPulseCount))
            .if((data) => data.pulseCount < data.previousPulseCount).do((sequence) => sequence
                .startWith(IncrementOverflowRegister)
                .input((step, data) => step.client = data.client)
                .input((step, data) => step.overflowRegister = data.overflowRegister)
                .output((step, data) => data.overflowCount = step.overflowCount))
        .onError(WorkflowErrorHandling.Retry, 500)
        .then(GoodbyeWorld);
    }
}