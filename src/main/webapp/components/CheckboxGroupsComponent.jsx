import React from 'react';
import ColumnLayout from '@splunk/react-ui/ColumnLayout';

function CheckboxGroupsComponent() {
    return (
        <ColumnLayout>
            <ColumnLayout.Row>
                <ColumnLayout.Column span={1}>C</ColumnLayout.Column>
                <ColumnLayout.Column span={6}>Span 5</ColumnLayout.Column>
                <ColumnLayout.Column span={5}>textbox</ColumnLayout.Column>
            </ColumnLayout.Row>
        </ColumnLayout>
    );
}

export default CheckboxGroupsComponent;
