import {
    IAMClient,
    CreateRoleCommand,
    DeleteRoleCommand,
    GetRoleCommand,
    UpdateAssumeRolePolicyCommand
} from "@aws-sdk/client-iam";
import {logInfo, logError} from "../helpers.js";

const iamClient = new IAMClient();

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

/**
 * Contains the ARNs of the resources created or used.
 * @typedef {Object} CreateRoleResult
 * @property {string} iamRoleArn - ARN of the IAM role.
 */


/**
 * If the function executes successfully, there will be an IAM role with the IoT credentials
 * assume policy in the account. The role may already exist, and permissions might not be set
 * correctly. This will attempt to overwrite the assume policy if the role already exists but with
 * the wrong permissions.
 * @param roleName the name of the IAM role to create or verify exists.
 * @returns {Promise<CreateRoleResult>}
 */
export async function createRole(roleName) {
    logInfo(`Using region ${await iamClient.config.region()}`);
    logInfo(`Checking if IAM role exists: ${roleName}`);

    let getRoleResponse = null;
    try {
        const getRoleCommand = new GetRoleCommand({RoleName: roleName});
        getRoleResponse = await iamClient.send(getRoleCommand);

        logInfo(`IAM role "${roleName}" already exists. ARN: ${getRoleResponse.Role.Arn}`);
    } catch (error) {
        if (error.name !== 'NoSuchEntityException') {
            logError('Unable to GetRole', error);
            throw error;
        }

        logInfo(`IAM role "${roleName}" not found. Creating it...`);
    }

    // Role exists, validate the permissions
    if (getRoleResponse) {
        const currentPolicy = JSON.parse(decodeURIComponent(getRoleRespnse.Role.AssumeRolePolicyDocument));

        const requiredStatement = assumePolicy.Statement[0];
        const hasRequiredStatement = currentPolicy.Statement.some((stmt) =>
            stmt.Effect === requiredStatement.Effect &&
            JSON.stringify(stmt.Principal) === JSON.stringify(requiredStatement.Principal) &&
            stmt.Action === requiredStatement.Action
        );

        if (hasRequiredStatement) {
            logInfo(`✅ "${roleName}"'s trust policy already has IoT assume role permissions.`);
            return { iamRoleArn: getRoleResponse.Role.Arn };
        }

        logInfo(`Updating trust policy for role "${roleName}"`);
        const updateCommand = new UpdateAssumeRolePolicyCommand({
            RoleName: roleName,
            PolicyDocument: JSON.stringify(assumePolicy)
        });

        try {
            await iamClient.send(updateCommand);
        } catch (error) {
            logError('Unable to UpdateAssumeRolePolicyCommand to add IoT assume role permissions!');
            throw error;
        }

        logInfo(`Updated trust policy for role "${roleName}"`);
        return { iamRoleArn: getRoleResponse.Role.Arn };
    }

    // Role doesn't exist, create it
    try {
        const createCommand = new CreateRoleCommand({
            RoleName: roleName,
            AssumeRolePolicyDocument: JSON.stringify(assumePolicy),
        });

        getRoleResponse = await iamClient.send(createCommand);

        logInfo(`Created IAM role: ${response.Role.Arn}`);
    } catch (error) {
        logError('Unable to CreateRole', error);
        throw error;
    }

    return { iamRoleArn: getRoleResponse.Role.Arn };
}

export async function deleteRole(roleName) {
    try {
        const deleteCommand = new DeleteRoleCommand({RoleName: roleName});
        await iamClient.send(deleteCommand);

        logInfo(`Deleted IAM role: ${roleName}`);
    } catch (error) {
        if (error.name !== 'NoSuchEntityException') {
            logError('Unable to GetRole', error);
            throw error;
        }

        logInfo(`✅ Role doesn't exist: ${roleName}`)
    }
}
