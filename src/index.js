import {createThing} from "./iot/thing";
import {createRole} from "./iam/role";
import {getInputs} from "./inputValidator";

async function main() {
    const { iotThingName, iamRoleName } = getInputs();

    await createThing(iotThingName);
    await createRole(iamRoleName);
}

main();
