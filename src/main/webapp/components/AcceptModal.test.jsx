import React from 'react';

import { render, screen } from '@testing-library/react';
import { TextDecoder } from 'node:util'; // (ESM style imports)
import AcceptModal from './AcceptModal';

// eslint-disable-next-line no-undef
global.TextDecoder = TextDecoder;

describe('AcceptModal', () => {
    let wasAccepted = false;

    beforeEach(() => {
        render(
            <AcceptModal
                title="test Title"
                message="test message"
                open
                handleRequestClose={(isAccepted) => {
                    wasAccepted = isAccepted;
                }}
                declineBtnLabel="No"
                acceptBtnLabel="Yes"
            />
        );
    });

    it('Return true on accept btn click', async () => {
        const modal = await screen.findByTestId('modal');
        expect(modal).toBeInTheDocument();

        wasAccepted = false;

        const acceptButton = screen.getByText('Yes');
        expect(acceptButton).toBeInTheDocument();

        expect(wasAccepted).toBe(false);

        acceptButton.click();

        expect(wasAccepted).toBe(true);
    });

    it('Return false on decline btn click', async () => {
        const modal = await screen.findByTestId('modal');
        expect(modal).toBeInTheDocument();

        wasAccepted = true;

        const declineButton = screen.getByText('No');
        expect(declineButton).toBeInTheDocument();

        declineButton.click();
        expect(wasAccepted).toBe(false);
    });

    it('Return false on closing modal by X btn', async () => {
        const modal = await screen.findByTestId('modal');
        expect(modal).toBeInTheDocument();

        wasAccepted = true;

        const closeXBtn = screen.getByTestId('close');
        expect(closeXBtn).toBeInTheDocument();

        closeXBtn.click();
        expect(wasAccepted).toBe(false);
    });
});
