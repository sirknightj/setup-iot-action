import { IAMClient, PutRolePolicyCommand, DeleteRolePolicyCommand } from "@aws-sdk/client-iam";
import { logInfo, logError } from "../helpers.js";

const iamClient = new IAMClient();

export async function putRolePolicy(roleName, policyName, permissionsPolicy) {
    try {
        logInfo(`Attaching inline policy "${policyName}" to role "${roleName}"...`);
        const command = new PutRolePolicyCommand({
            RoleName: roleName,
            PolicyName: policyName,
            PolicyDocument: JSON.stringify(permissionsPolicy),
        });
        await iamClient.send(command);
        logInfo(`Attached policy "${policyName}" to role "${roleName}"`);
    } catch (error) {
        logError('Unable to PutRolePolicy', error);
        throw error;
    }
}

export async function deleteRolePolicy(roleName, policyName) {
    try {
        logInfo(`Detaching inline policy "${policyName}" from role "${roleName}"...`);
        const command = new DeleteRolePolicyCommand({
            RoleName: roleName,
            PolicyName: policyName,
        });
        await iamClient.send(command);
        logInfo(`Detached policy "${policyName}" from role "${roleName}"`);
    } catch (error) {
        if (error.name !== 'NoSuchEntityException') {
            logError('Unable to DeleteRolePolicy', error);
            throw error;
        }

        logInfo(`✅ Inline policy "${policyName}" not found on role "${roleName}"`);
    }
}
