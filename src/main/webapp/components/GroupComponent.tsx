import React, { ReactNode } from 'react';
import styled from 'styled-components';
import CollapsiblePanel from '@splunk/react-ui/CollapsiblePanel';

const CollapsiblePanelWrapper = styled(CollapsiblePanel)`
    span {
        button {
            background-color: #f2f4f5;
            font-size: 16px;
            margin: 15px 0;

            &:hover:not([disabled]),
            &:focus:not([disabled]),
            &:active:not([disabled]) {
                background-color: #f2f4f5;
                box-shadow: none;
            }
        }
    }
`;

const CustomGroupLabel = styled.div`
    padding: 6px 10px;
    background-color: #f2f4f5;
    margin: 0 0 15px 0;
    font-size: 16px;
`;

interface GroupComponentProps {
    title: string;
    children: ReactNode;
    isExpandable?: boolean;
    defaultOpen?: boolean;
}

function GroupComponent({ isExpandable, defaultOpen, children, title }: GroupComponentProps) {
    return isExpandable ? (
        <CollapsiblePanelWrapper title={title} defaultOpen={defaultOpen}>
            <div className="collapsible-element">{children}</div>
        </CollapsiblePanelWrapper>
    ) : (
        <>
            <CustomGroupLabel>{title}</CustomGroupLabel>
            <div>{children}</div>
        </>
    );
}

export default GroupComponent;
