import React, { ReactNode } from 'react';
import styled from 'styled-components';
import CollapsiblePanel from '@splunk/react-ui/CollapsiblePanel';

const GroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const CollapsiblePanelWrapper = styled(CollapsiblePanel)`
    flex: 1;
    span {
        button {
            background-color: #f2f4f5;
            font-size: 16px;
            //margin: 15px 0;

            &:hover:not([disabled]),
            &:focus:not([disabled]),
            &:active:not([disabled]) {
                background-color: #f2f4f5;
                box-shadow: none;
            }
        }
    }
`;

const StyledPadding4 = styled.div`
    padding-top: 4px;
    padding-bottom: 4px;
`;

const CustomGroupLabel = styled.div`
    flex: 1;
    padding: 6px 10px;
    background-color: #f2f4f5;
    //margin: 0 0 15px 0;
    font-size: 16px;
`;

interface GroupProps {
    title: ReactNode;
    description: string;
    children: ReactNode;
    isExpandable?: boolean;
    defaultOpen?: boolean;
}

function Group({ isExpandable, defaultOpen, children, title, description }: GroupProps) {
    return (
        <GroupWrapper>
            {isExpandable ? (
                <CollapsiblePanelWrapper
                    title={title}
                    defaultOpen={defaultOpen}
                    description={description}
                >
                    <StyledPadding4>{children}</StyledPadding4>
                </CollapsiblePanelWrapper>
            ) : (
                <>
                    <CustomGroupLabel>{title}</CustomGroupLabel>
                    <div>{children}</div>
                </>
            )}
        </GroupWrapper>
    );
}

export default Group;
