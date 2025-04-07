import {getInput} from "@actions/core";

export function getInputs() {
    const iotThingName = getInput('thing-name');
    const iamRoleName = getInput('iam-role-name');
    const iamPolicyName = getInput('iam-policy-name');
    const permissionsPolicyRaw = getInput('iam-policy-string');

    if (!iotThingName.length) {
        throw `Required parameter not supplied: thing-name`;
    }

    if (!iamRoleName.length) {
        throw `Required parameter not supplied: iam-role-name`;
    }

    if (!iamPolicyName.length) {
        throw `Required parameter not supplied: iam-policy-name`;
    }

    if (!permissionsPolicyRaw.length) {
        throw new Error(`Required parameter not supplied: iam-policy-string`);
    }

    let permissionsPolicy;
    try {
        permissionsPolicy = JSON.parse(permissionsPolicyRaw);

        if (typeof permissionsPolicy !== 'object' || Array.isArray(permissionsPolicy) || permissionsPolicy === null) {
            throw new Error();
        }
    } catch {
        throw new Error(`permissions-policy must be a valid JSON object`);
    }

    return {iotThingName, iamRoleName, iamPolicyName, permissionsPolicy};
}
