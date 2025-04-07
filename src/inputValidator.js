import core from "@actions/core";

export function getInputs() {
    const iotThingName = core.getInput('thing-name');
    const iamRoleName = core.getInput('iam-role-name');

    if (!iotThingName.length) {
        throw `Required parameter not supplied: thing-name`;
    }

    if (!iamRoleName.length) {
        throw `Required parameter not supplied: thing-name`;
    }

    return { iotThingName, iamRoleName };
}