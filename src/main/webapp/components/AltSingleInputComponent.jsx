import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';

import { _ } from '@splunk/ui-utils/i18n';
import useSplunkTheme from '@splunk/themes/useSplunkTheme';
import axios from 'axios';
import styled from 'styled-components';

import { axiosCallWrapper } from '../util/axiosCallWrapper';
import { filterResponse } from '../util/util';

const SelectWrapper = styled(Select)`
    width: 300px !important;
`;

const CreatableSelectWrapper = styled(CreatableSelect)`
    width: 300px !important;
`;

function AltSingleInputComponent(props) {
    const {
        field,
        disabled = false,
        error = false,
        controlOptions,
        dependencyValues,
        ...restProps
    } = props;
    const {
        endpointUrl,
        denyList,
        allowList,
        placeholder = _('Select a value'),
        dependencies,
        createSearchChoice,
        referenceName,
        disableSearch,
        labelField,
        autoCompleteFields,
    } = controlOptions;

    const handleChange = (newValue, actionMeta) => {
        restProps.handleChange(field, newValue?.value || '');
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    };

    function generateOptions(items) {
        const data = [];

        items.forEach((item) => {
            if (item.value && item.label) {
                data.push({ label: item.label, value: item.value });
            }
            if (item.children && item.label) {
                const groupedItem = { label: item.label, options: [] };
                item.children.forEach((child) => {
                    groupedItem.options.push({ label: child.label, value: child.value });
                });
                data.push(groupedItem);
            }
        });
        return data;
    }

    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState(null);
    const [effectiveValue, setEffectiveValue] = useState({});
    const { errorColor } = useSplunkTheme();

    useEffect(() => {
        setLoading(true);
        let item;
        (options || []).every((x) => {
            if (Object.prototype.hasOwnProperty.call(x, 'value')) {
                if (x.value === props.value) {
                    item = x;
                    return false;
                }
            } else {
                x.options.every((y) => {
                    if (y.value === props.value) {
                        item = y;
                        return false;
                    }
                    return true;
                });
            }
            return true;
        });
        console.group('Item', field);
        console.log(props.value);
        console.log(item);
        if (!item && options) {
            item = { label: props.value, value: props.value };
        }
        console.log(item);
        console.groupEnd();
        setEffectiveValue(item || {});
        setLoading(false);
    }, [options, props.value]);

    useEffect(() => {
        if (!endpointUrl && !referenceName && autoCompleteFields) {
            setOptions(generateOptions(autoCompleteFields));
            return;
        }

        let current = true;
        const source = axios.CancelToken.source();

        // eslint-disable-next-line no-shadow
        const options = { CancelToken: source.token, handleError: true };
        if (referenceName) {
            options.serviceName = referenceName;
        } else if (endpointUrl) {
            options.endpointUrl = endpointUrl;
        }

        if (dependencyValues) {
            options.params = dependencyValues;
        }
        if (!dependencies || dependencyValues) {
            setLoading(true);
            axiosCallWrapper(options)
                .then((response) => {
                    if (current) {
                        setOptions(
                            generateOptions(
                                filterResponse(response.data.entry, labelField, allowList, denyList)
                            )
                        );
                        setLoading(false);
                    }
                })
                .catch(() => {
                    if (current) {
                        setLoading(false);
                    }
                });
        }
        // eslint-disable-next-line consistent-return
        return () => {
            source.cancel('Operation canceled.');
            current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dependencyValues]);

    const effectiveDisabled = loading ? true : disabled;
    const effectivePlaceholder = loading ? _('Loading') : placeholder;

    const customStyles = {
        control: (base) => ({
            ...base,
            borderColor: error ? errorColor : base.borderColor,
        }),
    };

    return (
        <>
            {createSearchChoice ? (
                <CreatableSelectWrapper
                    className="basic-single"
                    classNamePrefix="select"
                    value={effectiveValue.value ? effectiveValue : ''}
                    placeholder={effectivePlaceholder}
                    isDisabled={effectiveDisabled}
                    isClearable
                    isLoading={loading}
                    isSearchable={!disableSearch}
                    name={field}
                    options={options}
                    onChange={handleChange}
                    styles={customStyles}
                />
            ) : (
                <SelectWrapper
                    className="basic-single"
                    classNamePrefix="select"
                    value={effectiveValue.value ? effectiveValue : ''}
                    placeholder={effectivePlaceholder}
                    isDisabled={effectiveDisabled}
                    isClearable
                    isLoading={loading}
                    isSearchable={!disableSearch}
                    name={field}
                    options={options}
                    onChange={handleChange}
                    styles={customStyles}
                />
            )}
        </>
    );
}

AltSingleInputComponent.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    field: PropTypes.string,
    dependencyValues: PropTypes.object,
    controlOptions: PropTypes.shape({
        autoCompleteFields: PropTypes.array,
        endpointUrl: PropTypes.string,
        denyList: PropTypes.string,
        allowList: PropTypes.string,
        placeholder: PropTypes.string,
        dependencies: PropTypes.array,
        createSearchChoice: PropTypes.bool,
        referenceName: PropTypes.string,
        disableSearch: PropTypes.bool,
        labelField: PropTypes.string,
    }),
};

export default AltSingleInputComponent;
