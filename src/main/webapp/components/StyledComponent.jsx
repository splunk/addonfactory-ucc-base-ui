import styled from 'styled-components';
import CollapsiblePanel from '@splunk/react-ui/CollapsiblePanel';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';
import ControlGroup from '@splunk/react-ui/ControlGroup';

const CheckboxGroupContainer = styled.div`
    position: relative;
`;

const CheckboxLabelContainer = styled.div`
    display: flex;
    width: 280px;
    justify-content: space-between;
`;

const CheckboxGroupPanelWrapper = styled(CollapsiblePanel)`
    span {
        button {
            background-color: #f2f4f5;
            margin: 1px 0 1px 270px;
            width: 320px;

            &:hover:not([disabled]),
            &:focus:not([disabled]),
            &:active:not([disabled]) {
                background-color: #f2f4f5;
                box-shadow: none;
            }
        }
        button > span:nth-child(2) {
            width: 280px;
        }
    }
`;

const CustomCheckboxGroupsLabel = styled.div`
    display: inline-flex;
    position: absolute;
    width: 240px !important;
    padding: 6px 0;
    justify-content: flex-end;
`;

const StyledColumnLayout = styled(ColumnLayout)`
    width: 320px !important;
`;

const CustomElement = styled.div`
    margin-left: 30px;
`;

const CheckboxElement = styled.div`
    margin-left: 270px;
    margin-top: 2px;
`;

const ControlGroupWrapper = styled(ControlGroup).attrs((props) => ({
    'data-name': props.dataName,
}))`
    width: 100%;
    max-width: 100%;

    > * {
        &:first-child {
            width: 240px !important;
        }
        &:nth-child(3) {
            margin-left: 270px !important;
            width: 320px;
        }
    }

    span[class*='ControlGroupStyles__StyledAsterisk-'] {
        color: red;
    }
`;

const CheckboxGroupsToggleButtonWrapper = styled.div`
    position: relative;
    margin-left: 270px;
    margin-top: 10px;
`;

export {
    CheckboxLabelContainer,
    CheckboxGroupPanelWrapper,
    CustomCheckboxGroupsLabel,
    StyledColumnLayout,
    CheckboxGroupContainer,
    CustomElement,
    CheckboxElement,
    ControlGroupWrapper,
    CheckboxGroupsToggleButtonWrapper,
};
