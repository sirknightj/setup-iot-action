const core = require('@actions/core');

async function main() {
    const thingName = core.getInput('thing-name');

    createThing(thingName);
}

main();