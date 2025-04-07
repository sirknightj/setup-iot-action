const core = require('@actions/core');
const {deleteRole} = require("./iam/role");
const {deleteThing} = require("./iot/thing");
const {getInputs} = require("./inputValidator");
const {deleteRolePolicy} = require("./iam/policy");

async function main() {
    const { iotThingName, iamRoleName, iamPolicyName } = getInputs();

    await deleteRolePolicy(iamRoleName, iamPolicyName);
    await deleteRole(iamRoleName);
    await deleteThing(iotThingName);
}

main();