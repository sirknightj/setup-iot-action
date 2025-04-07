const {deleteRole} = require("./iam/role");
const {deleteThing} = require("./iot/thing");
const {getInputs} = require("./inputValidator");
const {deleteRolePolicy} = require("./iam/policy");
const {deleteRoleAlias} = require("./iot/roleAlias");
const {logError} = require("./helpers");

async function main() {
    const {iotThingName, iamRoleName, iamPolicyName, roleAliasName} = getInputs();

    try {
        await deleteRoleAlias(roleAliasName);
    } catch (e) {
        logError('Unable to delete role alias', e);
    }

    try {
        await deleteRolePolicy(iamRoleName, iamPolicyName);
    } catch (e) {
        logError('Unable to delete role policy', e);
    }

    try {
        await deleteRole(iamRoleName);
    } catch (e) {
        logError('Unable to delete iam role', e);
    }

    try {
        await deleteThing(iotThingName);
    } catch (e) {
        logError('Unable to delete delete thing', e);
    }
}

main();
