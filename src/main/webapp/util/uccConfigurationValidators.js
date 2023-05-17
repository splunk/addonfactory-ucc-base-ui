import * as _ from 'lodash';
import { Validator } from 'jsonschema';
import { getFormattedMessage } from './messageUtil';
import schema from '../schema/schema.json';

const appendError = (errors, err, position) => {
    if (err) {
        errors.push(new Error(err, position));
    }
};

export const parseRegexRawStr = (rawStr) => {
    let error;
    let result;

    try {
        result = new RegExp(rawStr);
    } catch (e) {
        error = getFormattedMessage(12, rawStr);
    }

    return { error, result };
};

export const parseArrForDupKeys = (arr, targetField) => {
    const uniqFieldsLength = _.uniqBy(arr, (d) => {
        if (_.isString(d[targetField])) {
            return d[targetField].toLowerCase();
        }
        return d[targetField];
    }).length;
    if (arr.length !== uniqFieldsLength) {
        return getFormattedMessage(21, targetField);
    }
    return false;
};

export const parseNumberValidator = (range) => {
    const isRangeLegal =
        range.length === 2 && _.isNumber(range[0]) && _.isNumber(range[1]) && range[0] <= range[1];

    const error = isRangeLegal ? undefined : getFormattedMessage(13, JSON.stringify(range));

    return { error };
};

export const parseFunctionRawStr = (rawStr) => {
    let err;
    let result;

    try {
        // eslint-disable-next-line no-eval
        result = eval(`(${rawStr})`);
    } catch (e) {
        err = getFormattedMessage(11, rawStr);
    }

    return { err, result };
};

export const checkDupKeyValues = (config, isInput, location) => {
    // Forbid dup name/title in services and tabs
    const servicesLikeArr = _.get(config, isInput ? 'services' : 'tabs');
    const errors = [];
    let error;
    let position;

    if (servicesLikeArr) {
        position = `${location}.${isInput ? 'services' : 'tabs'}`;

        // Forbid dup value/label for items and autoCompleteFields
        const checkEntityDupKeyValues = ({ options }, postion) => {
            if (!options) {
                return;
            }

            const { items } = options;

            if (items) {
                ['label', 'value'].forEach((d) => {
                    error = parseArrForDupKeys(items, d);
                    appendError(errors, error, `${postion}.options.items`);
                });
            }
        };

        // Forbid dup field/label for entity
        servicesLikeArr.forEach((serviceLikeObj, i) => {
            const entityPosition = `${position}[${i}].entity`;
            if (serviceLikeObj.entity) {
                serviceLikeObj.entity.forEach((obj, k) => {
                    checkEntityDupKeyValues(obj, `${entityPosition}[${k}]`);
                });
            }
        });
    }

    return errors;
};

const checkConfigDetails = ({ pages: { configuration, inputs } }) => {
    let errors = [];
    const position = 'instantce.pages';

    const checkBaseOptions = (options, pos) => {
        _.values(options).forEach((d, i) => {
            const { err } = parseFunctionRawStr(d);
            appendError(errors, err, `${pos}[${i}]`);
        });
    };

    if (inputs) {
        const { services } = inputs;
        services.forEach((service, i) => {
            const { options } = service;
            checkBaseOptions(options, `${position}.inputs.services[${i}].options`);
        });
        errors = errors.concat(checkDupKeyValues(inputs, true, `${position}.inputs`));
    }

    if (configuration) {
        configuration.tabs.forEach((tab, i) => {
            const { options } = tab;
            checkBaseOptions(options, `${position}.configuration.tabs[${i}].options`);
        });
        errors = errors.concat(
            checkDupKeyValues(configuration, false, `${position}.configuration`)
        );
    }

    return errors;
};

export const validateSchema = (config) => {
    const validator = new Validator();
    const res = validator.validate(config, schema);
    if (!res.errors.length) {
        res.errors = checkConfigDetails(config);
    }
    return {
        failed: !!res.errors.length,
        errors: res.errors,
    };
};
