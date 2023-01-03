import { PREDEFINED_VALIDATORS_DICT } from '../constants/preDefinedRegex';
import { getFormattedMessage } from './messageUtil';
import {
    parseNumberValidator,
    parseRegexRawStr,
    parseStringValidator,
    parseFunctionRawStr,
    parseFileValidator,
} from './uccConfigurationValidators';
import FILE from '../constants/constant';

// Validate provided saveValidator function
export function SaveValidator(validatorFunc, formData) {
    const { error, result } = parseFunctionRawStr(validatorFunc);
    if (error) {
        return { errorMsg: error };
    }
    const ret = result(formData);
    if (typeof ret === 'string') {
        return { errorMsg: ret };
    }
}

class Validator {
    constructor(entities) {
        this.entities = entities;
        this.isName = entities.find((e) => e.field === 'name');
    }

    // eslint-disable-next-line class-methods-use-this
    checkIsFieldHasInput = (attrValue) =>
        attrValue !== undefined && attrValue !== null && attrValue.trim() !== '';

    // Validate the required field has value
    RequiredValidator(field, label, data) {
        if (!this.checkIsFieldHasInput(data)) {
            return { errorField: field, errorMsg: getFormattedMessage(6, [label]) };
        }
        return false;
    }

    // Validate the string length of field
    StringValidator(field, label, validator, data) {
        const { error } = parseStringValidator(validator.minLength, validator.maxLength);
        if (error) {
            return { errorField: field, errorMsg: error };
        }
        if (this.checkIsFieldHasInput(data) && data.length > validator.maxLength) {
            return {
                errorField: field,
                errorMsg: validator.errorMsg
                    ? validator.errorMsg
                    : getFormattedMessage(18, [label, validator.maxLength]),
            };
        }
        if (this.checkIsFieldHasInput(data) && data.length < validator.minLength) {
            return {
                errorField: field,
                errorMsg: validator.errorMsg
                    ? validator.errorMsg
                    : getFormattedMessage(17, [label, validator.minLength]),
            };
        }
        return false;
    }

    // Validate the field should match the provided Regex
    RegexValidator(field, label, validator, data) {
        const { error, result: regex } = parseRegexRawStr(validator.pattern);
        if (error) {
            return { errorField: field, errorMsg: error };
        }
        if (this.checkIsFieldHasInput(data) && !regex.test(data)) {
            return {
                errorField: field,
                errorMsg: validator.errorMsg
                    ? validator.errorMsg
                    : getFormattedMessage(15, [label, validator.pattern]),
            };
        }
        return false;
    }

    // Validate the custom component
    static CustomValidator(validatorFunc, field, data) {
        const ret = validatorFunc(field, data);
        if (typeof ret === 'string') {
            return { errorField: field, errorMsg: ret };
        }
        return false;
    }

    // Validate the field should match predefined Regexes
    PreDefinedRegexValidator(field, label, validator, data, pattern, inputValueType) {
        const { error, result: regex } = parseRegexRawStr(pattern);
        if (error) {
            return { errorField: field, errorMsg: error };
        }
        if (this.checkIsFieldHasInput(data) && !regex.test(data)) {
            return {
                errorField: field,
                errorMsg: validator.errorMsg
                    ? validator.errorMsg
                    : getFormattedMessage(19, [label, inputValueType]),
            };
        }
        return false;
    }

    // Validate the range of numeric field
    NumberValidator(field, label, validator, data) {
        const { error } = parseNumberValidator(validator.range);
        if (error) {
            return { errorField: field, errorMsg: error };
        }

        const val = Number(data);
        if (Number.isNaN(val)) {
            return {
                errorField: field,
                errorMsg: validator.errorMsg
                    ? validator.errorMsg
                    : getFormattedMessage(16, [label]),
            };
        }
        if (
            (this.checkIsFieldHasInput(data) && val > validator.range[1]) ||
            val < validator.range[0]
        ) {
            return {
                errorField: field,
                errorMsg: validator.errorMsg
                    ? validator.errorMsg
                    : getFormattedMessage(8, [label, validator.range[0], validator.range[1]]),
            };
        }
        return false;
    }

    // eslint-disable-next-line class-methods-use-this
    FileValidator(field, validator, data) {
        if (data) {
            const { isValidExtension, fileSize, isValidContent } = parseFileValidator(
                data,
                validator.supportedFileTypes
            );
            if (!isValidExtension) {
                return {
                    errorField: field,
                    errorMsg:
                        validator.errorMsg ||
                        getFormattedMessage(24, [validator.supportedFileTypes]),
                };
            }
            if (fileSize > FILE.FILE_MAX_SIZE) {
                const fileSizeInKb = `${FILE.FILE_MAX_SIZE / 1024}KB`;
                return {
                    errorField: field,
                    errorMsg: getFormattedMessage(25, [fileSizeInKb]),
                };
            }
            if (!isValidContent) {
                return {
                    errorField: field,
                    errorMsg: getFormattedMessage(26),
                };
            }
        }
        return false;
    }

    doValidation(data) {
        if (this.isName) {
            const targetValue = data.name;
            const nameFieldLabel = this.isName.label;

            if (typeof targetValue === 'undefined' || targetValue === '' || targetValue == null) {
                return { errorField: 'name', errorMsg: getFormattedMessage(0, [nameFieldLabel]) };
            }
            if (!(typeof targetValue === 'string' || targetValue instanceof String)) {
                return { errorField: 'name', errorMsg: getFormattedMessage(1, [nameFieldLabel]) };
            }
            if (
                targetValue.startsWith('_') ||
                targetValue === '.' ||
                targetValue === '..' ||
                targetValue.toLowerCase() === 'default'
            ) {
                return { errorField: 'name', errorMsg: getFormattedMessage(3, [nameFieldLabel]) };
            }
            const regexMetaCharacters = ['*', '\\', '[', ']', '(', ')', '?', ':'];
            if (regexMetaCharacters.some((d) => targetValue.indexOf(d) > -1)) {
                return { errorField: 'name', errorMsg: getFormattedMessage(3, [nameFieldLabel]) };
            }

            if (targetValue.length >= 1024) {
                return { errorField: 'name', errorMsg: getFormattedMessage(22, [nameFieldLabel]) };
            }
        }

        let ret;
        let i;
        let j;

        for (i = 0; i < this.entities.length; i += 1) {
            if (this.entities[i].required === true) {
                ret = this.RequiredValidator(
                    this.entities[i].field,
                    this.entities[i].label,
                    data[this.entities[i].field]
                );
                if (ret) {
                    return ret;
                }
            }
            if (data[this.entities[i].field] === '' || data[this.entities[i].field] === null) {
                // eslint-disable-next-line no-continue
                continue;
            }
            if (this.entities[i].validators) {
                for (j = 0; j < this.entities[i].validators.length; j += 1) {
                    switch (this.entities[i].validators[j].type) {
                        case 'string':
                            ret = this.StringValidator(
                                this.entities[i].field,
                                this.entities[i].label,
                                this.entities[i].validators[j],
                                data[this.entities[i].field]
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'regex':
                            ret = this.RegexValidator(
                                this.entities[i].field,
                                this.entities[i].label,
                                this.entities[i].validators[j],
                                data[this.entities[i].field]
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'number':
                            ret = this.NumberValidator(
                                this.entities[i].field,
                                this.entities[i].label,
                                this.entities[i].validators[j],
                                data[this.entities[i].field]
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'url':
                            ret = this.PreDefinedRegexValidator(
                                this.entities[i].field,
                                this.entities[i].label,
                                this.entities[i].validators[j],
                                data[this.entities[i].field],
                                PREDEFINED_VALIDATORS_DICT.url.regex,
                                PREDEFINED_VALIDATORS_DICT.url.inputValueType
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'date':
                            ret = this.PreDefinedRegexValidator(
                                this.entities[i].field,
                                this.entities[i].label,
                                this.entities[i].validators[j],
                                data[this.entities[i].field],
                                PREDEFINED_VALIDATORS_DICT.date.regex,
                                PREDEFINED_VALIDATORS_DICT.date.inputValueType
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'email':
                            ret = this.PreDefinedRegexValidator(
                                this.entities[i].field,
                                this.entities[i].label,
                                this.entities[i].validators[j],
                                data[this.entities[i].field],
                                PREDEFINED_VALIDATORS_DICT.email.regex,
                                PREDEFINED_VALIDATORS_DICT.email.inputValueType
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'ipv4':
                            ret = this.PreDefinedRegexValidator(
                                this.entities[i].field,
                                this.entities[i].label,
                                this.entities[i].validators[j],
                                data[this.entities[i].field],
                                PREDEFINED_VALIDATORS_DICT.ipv4.regex,
                                PREDEFINED_VALIDATORS_DICT.ipv4.inputValueType
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'file':
                            ret = this.FileValidator(
                                this.entities[i].field,
                                this.entities[i].validators[j],
                                data[this.entities[i].field]
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        case 'custom':
                            ret = Validator.CustomValidator(
                                this.entities[i].validators[j].validatorFunc,
                                this.entities[i].field,
                                data[this.entities[i].field]
                            );
                            if (ret) {
                                return ret;
                            }
                            break;
                        default:
                    }
                }
            }
        }
        return false;
    }
}

export default Validator;
