const core = require('@actions/core');
const {deleteRole} = require("./iam/role");
const {deleteThing} = require("./iot/thing");

async function main() {
    const iotThingName = core.getInput('thing-name');
    const iamRoleName = core.getInput('iam-role-name');

    await deleteRole(iamRoleName);
    await deleteThing(iotThingName);
}

main();