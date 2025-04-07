import {createThing} from "./iot/thing";
import {createRole} from "./iam/role";

const core = require('@actions/core');

async function main() {
    const iotThingName = core.getInput('thing-name');
    const iamRoleName = core.getInput('iam-role-name');

    await createThing(iotThingName);
    await createRole(iamRoleName);
}

main();
