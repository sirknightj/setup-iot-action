import {logError, logInfo} from "../helpers";
import {CreateThingCommand, DeleteThingCommand, DescribeThingCommand, IoTClient} from "@aws-sdk/client-iot";

const iotClient = new IoTClient();

export async function createThing(thingName) {
    logInfo(`Using region ${await iotClient.config.region()}`);
    logInfo(`Checking if thing exists: ${thingName}`);

    try {
        const describeCommand = new DescribeThingCommand({thingName});
        const response = await iotClient.send(describeCommand);

        logInfo(`Thing "${thingName}" already exists. ARN: ${response.thingArn}`);
        return response.thingArn;
    } catch (error) {
        if (error.name !== 'ResourceNotFoundException') {
            logError('Unable to DescribeThing', error);
            throw error;
        }

        logInfo(`Thing "${thingName}" not found. Creating it...`);

        const createThingCommand = new CreateThingCommand({thingName});
        const response = await iotClient.send(createThingCommand);

        logInfo(`Created thing: ${response.thingArn}`);
        return response.thingArn;
    }
}

export async function deleteThing(thingName) {
    try {
        const deleteThingCommand = new DeleteThingCommand({thingName});
        await iotClient.send(deleteThingCommand);

        logInfo(`Deleted thing: ${thingName}`);
    } catch (error) {
        if (error.name !== 'ResourceNotFoundException') {
            logError('Unable to DeleteThing', error);
            throw error;
        }

        logInfo(`✅ Thing doesn't exist: ${thingName}`)
    }
}
