import {createThing} from "./iot/thing";
import {createRole} from "./iam/role";
import {getInputs} from "./inputValidator";
import {putRolePolicy} from "./iam/policy";

async function main() {
    const { iotThingName, iamRoleName, iamPolicyName, permissionsPolicy } = getInputs();

    await createThing(iotThingName);
    await createRole(iamRoleName);
    await putRolePolicy(iamRoleName, iamPolicyName, permissionsPolicy);
}

main();
