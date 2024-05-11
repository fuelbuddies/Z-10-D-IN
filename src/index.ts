import { configureWorkflow } from "workflow-es";
import { Z10DIN_Workflow } from "./workflow";
import { findDispenserPort } from "./utils/findDispenserPort";
import { getConfigFromEnv } from "./utils/envParser";
import { DispenserOptions } from "./utils/dispenserOptions";

async function main(options: DispenserOptions) {
    const { hardwareId, attributeId, baudRate = 9600 } = options;

    var config = configureWorkflow();
    //config.useLogger(new ConsoleLogger());
    //let mongoPersistence = new MongoDBPersistence("mongodb://127.0.0.1:27017/workflow-node");    
    //await mongoPersistence.connect;    
    //config.usePersistence(mongoPersistence);
    var host = config.getHost();

    host.registerWorkflow(Z10DIN_Workflow);
    await host.start();
    let id = await host.startWorkflow("z10d1n-world", 1, { address: await findDispenserPort(hardwareId, attributeId), id: 1, timeout: 1000, baudRate});
    console.log("Started workflow: " + id);
}

main(getConfigFromEnv());