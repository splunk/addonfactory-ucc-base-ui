import React from 'react';

import { render, screen } from '@testing-library/react';
import { InteractAllStatusButtons } from './InteractAllStatusButton';

describe('InteractAllStatusButtons', () => {
    const handleToggleStatusChange = jest.fn();

    const allDataRowsMockUp = {
        demo_input: {
            aaaaa: {
                account: 'Test_Account',
                disabled: false,
                'eai:acl': null,
                host: '$decideOnStartup',
                host_resolved: 'testHost',
                index: 'default',
                interval: '300',
                'python.version': null,
                id: 'https://localhost/aaaaa',
                name: 'aaaaa',
                serviceName: 'demo_input',
                serviceTitle: 'demo_input',
                __toggleShowSpinner: false,
            },
            bbbbb: {
                account: 'Test_Account_2',
                disabled: false,
                'eai:acl': null,
                host: '$decideOnStartup',
                host_resolved: 'testHost',
                index: 'default',
                interval: '300',
                'python.version': null,
                id: 'https://localhost/bbbbb',
                name: 'bbbbb',
                serviceName: 'demo_input',
                serviceTitle: 'demo_input',
                __toggleShowSpinner: false,
            },
            brrrrrrr: {
                account: 'aaaaa',
                disabled: false,
                'eai:acl': null,
                host: '$decideOnStartup',
                host_resolved: 'testHost',
                index: 'default',
                interval: '300',
                'python.version': null,
                id: 'https://localhost/brrrrrrr',
                name: 'brrrrrrr',
                serviceName: 'demo_input',
                serviceTitle: 'demo_input',
                __toggleShowSpinner: false,
            },
            cccccc: {
                account: 'Test_Account',
                disabled: true,
                'eai:acl': null,
                host: '$decideOnStartup',
                host_resolved: 'testHost',
                index: 'default',
                interval: '300',
                'python.version': null,
                id: 'https://localhost/cccccc',
                name: 'cccccc',
                serviceName: 'demo_input',
                serviceTitle: 'demo_input',
                __toggleShowSpinner: false,
            },
            dddddd: {
                account: 'Test_Account_2',
                disabled: true,
                'eai:acl': null,
                host: '$decideOnStartup',
                host_resolved: 'testHost',
                index: 'default',
                interval: '300',
                'python.version': null,
                id: 'https://localhost/dddddd',
                name: 'dddddd',
                serviceName: 'demo_input',
                serviceTitle: 'demo_input',
                __toggleShowSpinner: false,
            },
            gggggg: {
                account: 'aaaaa',
                disabled: true,
                'eai:acl': null,
                host: '$decideOnStartup',
                host_resolved: 'testHost',
                index: 'default',
                interval: '300',
                'python.version': null,
                id: 'https://localhost/gggggg',
                name: 'gggggg',
                serviceName: 'demo_input',
                serviceTitle: 'demo_input',
                __toggleShowSpinner: false,
            },
        },
    };

    const totalElements = Object.values(allDataRowsMockUp)
        .map((data) => Object.values(data).map((row) => row))
        .flat().length;

    beforeEach(() => {
        render(
            <InteractAllStatusButtons
                data-testid="actionBtns"
                displayActionBtnAllRows
                totalElement={totalElements}
                allDataRows={allDataRowsMockUp}
                changeToggleStatus={handleToggleStatusChange}
            />
        );
    });

    it('Disable All enabled rows correctly', async () => {
        const disableBtn = await screen.findByText('Disable all');
        expect(disableBtn).toBeInTheDocument();

        disableBtn.click();

        const yesPopUpBtn = await screen.findByText('Yes');
        expect(yesPopUpBtn).toBeInTheDocument();

        yesPopUpBtn.click();

        expect(handleToggleStatusChange).toHaveBeenCalledWith(allDataRowsMockUp.demo_input.aaaaa);
        expect(handleToggleStatusChange).toHaveBeenCalledWith(allDataRowsMockUp.demo_input.bbbbb);
        expect(handleToggleStatusChange).toHaveBeenCalledWith(
            allDataRowsMockUp.demo_input.brrrrrrr
        );
        expect(handleToggleStatusChange).toHaveBeenCalledTimes(3);
    });

    it('Enable All disabled rows correctly', async () => {
        const enableBtn = await screen.findByText('Enable all');
        expect(enableBtn).toBeInTheDocument();

        enableBtn.click();

        const yesPopUpBtn = await screen.findByText('Yes');
        expect(yesPopUpBtn).toBeInTheDocument();

        yesPopUpBtn.click();

        expect(handleToggleStatusChange).toHaveBeenCalledWith(allDataRowsMockUp.demo_input.cccccc);
        expect(handleToggleStatusChange).toHaveBeenCalledWith(allDataRowsMockUp.demo_input.dddddd);
        expect(handleToggleStatusChange).toHaveBeenCalledWith(allDataRowsMockUp.demo_input.gggggg);
        expect(handleToggleStatusChange).toHaveBeenCalledTimes(3);
    });

    it('Do not disable status if rejected', async () => {
        const disableBtn = await screen.findByText('Disable all');
        expect(disableBtn).toBeInTheDocument();

        disableBtn.click();

        const noPopUpBtn = await screen.findByText('No');
        expect(noPopUpBtn).toBeInTheDocument();

        noPopUpBtn.click();

        expect(handleToggleStatusChange).toHaveBeenCalledTimes(0);
    });

    it('Do not enable status if rejected', async () => {
        const enableBtn = await screen.findByText('Enable all');
        expect(enableBtn).toBeInTheDocument();

        enableBtn.click();

        const noPopUpBtn = await screen.findByText('No');
        expect(noPopUpBtn).toBeInTheDocument();

        noPopUpBtn.click();

        expect(handleToggleStatusChange).toHaveBeenCalledTimes(0);
    });

    it('Do not enable status if popup modal closed by X', async () => {
        const enableBtn = await screen.findByText('Enable all');
        expect(enableBtn).toBeInTheDocument();

        enableBtn.click();

        const closeXBtn = screen.getByTestId('close');
        expect(closeXBtn).toBeInTheDocument();

        closeXBtn.click();

        expect(handleToggleStatusChange).toHaveBeenCalledTimes(0);
    });

    it('Do not disable status if popup modal closed by X', async () => {
        const disableBtn = await screen.findByText('Disable all');
        expect(disableBtn).toBeInTheDocument();

        disableBtn.click();

        const closeXBtn = screen.getByTestId('close');
        expect(closeXBtn).toBeInTheDocument();

        closeXBtn.click();

        expect(handleToggleStatusChange).toHaveBeenCalledTimes(0);
    });
});
