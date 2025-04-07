import {createThing} from "./setup";

const core = require('@actions/core');

async function main() {
    const thingName = core.getInput('thing-name');

    await createThing(thingName);
}

main();
