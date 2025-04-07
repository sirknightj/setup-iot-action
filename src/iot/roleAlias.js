import {IoTClient, CreateRoleAliasCommand, DeleteRoleAliasCommand} from "@aws-sdk/client-iot";
import { logError, logInfo } from "../helpers";

const iotClient = new IoTClient();

export async function createRoleAlias(roleAlias, roleArn, credentialDurationSeconds) {
    try {
        logInfo(`Creating role alias "${roleAlias}" with role ARN: ${roleArn}`);

        const command = new CreateRoleAliasCommand({
            roleAlias,
            roleArn,
            credentialDurationSeconds: credentialDurationSeconds,
        });

        const response = await iotClient.send(command);
        const aliasArn = response.roleAliasArn;

        logInfo(`Created role alias ARN: ${aliasArn}`);

        return aliasArn;
    } catch (error) {
        logError("Failed to create role alias", error);
        throw error;
    }
}

export async function deleteRoleAlias(roleAlias) {
    try {
        const command = new DeleteRoleAliasCommand({ roleAlias });
        await iotClient.send(command);

        logInfo(`✅ Deleted role alias: ${roleAlias}`);
    } catch (error) {
        if (error.name !== "ResourceNotFoundException") {
            logError("Failed to delete role alias", error);
            throw error;
        }

        logInfo(`✅ Role alias "${roleAlias}" already deleted`);
    }
}
