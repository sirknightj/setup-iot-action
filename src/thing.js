import {logError, logInfo} from "./helpers";
import {IoTClient, DeleteThingCommand} from "@aws-sdk/client-iot";

const iotClient = new IoTClient();

export async function deleteThing(thingName) {
    try {
        const deleteThingCommand = new DeleteThingCommand({thingName});
        await iotClient.send(deleteThingCommand);
    } catch (error) {
        logError('Unable to DeleteThing', error);
        throw error;
    }
}
