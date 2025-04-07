import {createThing} from "./iot/thing";
import {createRole} from "./iam/role";
import {getInputs} from "./inputValidator";
import {putRolePolicy} from "./iam/policy";
import {createRoleAlias} from "./iot/roleAlias";

async function main() {
    const { iotThingName, iamRoleName, iamPolicyName, permissionsPolicy, roleAliasName, credentialDurationSeconds} = getInputs();

    await createThing(iotThingName);
    const { iamRoleArn } = await createRole(iamRoleName);
    await putRolePolicy(iamRoleName, iamPolicyName, permissionsPolicy);
    await createRoleAlias(roleAliasName, iamRoleArn, credentialDurationSeconds)
}

main();
