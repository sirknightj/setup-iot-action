import {IoTClient, CreateThingCommand, DescribeThingCommand} from '@aws-sdk/client-iot';
import {logError, logInfo} from "./helpers";

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
