const core = require('@actions/core');
const {deleteRole} = require("./iam/role");
const {deleteThing} = require("./iot/thing");
const {getInputs} = require("./inputValidator");

async function main() {
    const { iotThingName, iamRoleName } = getInputs();

    await deleteRole(iamRoleName);
    await deleteThing(iotThingName);
}

main();