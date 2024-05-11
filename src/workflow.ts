import { WorkflowBase, WorkflowBuilder } from "workflow-es";
import { Seneca } from "./data";
import { GoodbyeWorld } from "./steps/goodbye";
import { HelloWorld } from "./steps/hello";
import { InitializeSeleca } from "./steps/connect";
import ModbusRTU from "modbus-serial";

export class Z10DIN_Workflow implements WorkflowBase<Seneca> {
    public id: string = "z10d1n-world";
    public version: number = 1;

    public build(builder: WorkflowBuilder<Seneca>) {        
        builder
        .startWith(InitializeSeleca)
            .input((step, data) => step.id = data.id)
            .input((step, data) => step.timeout = data.timeout)
            .input((step, data) => step.address = data.address)
            .input((step) => step.client = new ModbusRTU())
            .output((step, data) => data.client = step.client)
        .then(GoodbyeWorld)
        .then(HelloWorld)
    }
}