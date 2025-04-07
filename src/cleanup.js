const core = require('@actions/core');
const {deleteThing} = require("./thing");

async function main() {
    const thingName = core.getInput('thing-name');

    await deleteThing(thingName);
}

main();