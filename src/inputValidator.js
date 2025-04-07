import {getInput} from "@actions/core";

export function getInputs() {
    const iotThingName = getInput('thing-name');
    const iamRoleName = getInput('iam-role-name');

    if (!iotThingName.length) {
        throw `Required parameter not supplied: thing-name`;
    }

    if (!iamRoleName.length) {
        throw `Required parameter not supplied: thing-name`;
    }

    return {iotThingName, iamRoleName};
}
