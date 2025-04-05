import { IoTClient, CreateThingCommand } from '@aws-sdk/client-iot';
import * as fs from 'fs/promises';
import * as path from 'path';

const iot = new IoTClient({ region: process.env.AWS_DEFAULT_REGION });

export async function createThing(thingName) {
    console.log(`Creating thing: ${thingName}`);
    // const command = new CreateThingCommand({ thingName });
    // const response = await iot.send(command);
    // return response.thingName;
}
