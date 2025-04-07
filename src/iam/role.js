import { IAMClient, CreateRoleCommand, DeleteRoleCommand, GetRoleCommand } from "@aws-sdk/client-iam";
import { logInfo, logError } from "../helpers.js";

const iamClient = new IAMClient();

export async function createRole(roleName) {
    logInfo(`Using region ${await iamClient.config.region()}`);
    logInfo(`Checking if IAM role exists: ${roleName}`);

    try {
        const getRoleCommand = new GetRoleCommand({ RoleName: roleName });
        const response = await iamClient.send(getRoleCommand);

        logInfo(`IAM role "${roleName}" already exists. ARN: ${response.Role.Arn}`);
        return response.Role.Arn;
    } catch (error) {
        if (error.name !== 'NoSuchEntity') {
            logError('Unable to GetRole', error);
            throw error;
        }

        logInfo(`IAM role "${roleName}" not found. Creating it...`);
    }

    const assumePolicy = {
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Principal: {
                    Service: "credentials.iot.amazonaws.com"
                },
                Action: "sts:AssumeRole"
            }
        ]
    };

    try {
        const createCommand = new CreateRoleCommand({
            RoleName: roleName,
            AssumeRolePolicyDocument: JSON.stringify(assumePolicy),
        });

        const response = await iamClient.send(createCommand);

        logInfo(`Created IAM role: ${response.Role.Arn}`);
        return response.Role.Arn;
    } catch (error) {
        logError('Unable to CreateRole', error);
        throw error;
    }
}

export async function deleteRole(roleName) {
    try {
        const deleteCommand = new DeleteRoleCommand({ RoleName: roleName });
        await iamClient.send(deleteCommand);

        logInfo(`Deleted IAM role: ${roleName}`);
    } catch (error) {
        logError('Unable to DeleteRole', error);
        throw error;
    }
}
