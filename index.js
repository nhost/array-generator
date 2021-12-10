const core = require('@actions/core');

try {
    const inputValue = core.getInput('value', {required: true, trimWhitespace: true});
    const allValues = core.getInput('all_values', {required: true, trimWhitespace: true});
    let values = [];
    for (const value of allValues.split(',')) {
        values.push(value.trim());
    }

    let output = null;
    for (const value of values) {
        if (value === inputValue) {
            output = [value];
            break
        }
    }
    if (output === null) {
        output = values;
    }

    if (core.getBooleanInput('quote_output', {required: false, trimWhitespace: true}) === true) {
        output = JSON.stringify(output)
    }
    core.setOutput('array', JSON.stringify(output));
} catch (error) {
    core.setFailed(error.message);
}


