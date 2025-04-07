import {deleteThing} from "./cleanup";

const core = require('@actions/core');

async function main() {
    const thingName = core.getInput('thing-name');

    await deleteThing(thingName);
}

main();