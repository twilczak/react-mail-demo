import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { MemoryRouter, Route } from 'react-router-dom';
import { Mailbox } from "./Mailbox";

import { MailService } from "../MailService";

jest.mock('../MailService');

describe(Mailbox, () => {
    const mockMessages = [{id: 'test'}];

    MailService.getMessages.mockReturnValue(
        { then: (callback) => {callback({data: mockMessages});} }
    );

    const component = mount(
        <MemoryRouter initialEntries={['/inbox']}>
            <Route path="/inbox" component={Mailbox}/>
        </MemoryRouter>
    );

    it('renders and matches the snapshot', () => {
        const component = renderer.create(
            <MemoryRouter initialEntries={['/inbox']}>
                <Route path="/inbox" component={Mailbox}/>
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    });

    it('renders the mailbox markup', () => {
        expect(component.find('.mailbox')).toBeTruthy();
        expect(component.find('MailboxControls')).toBeTruthy();
        expect(component.find('MailboxList')).toBeTruthy();
        expect(component.find('.mailbox-border')).toBeTruthy();
    });

    it('calls MailService.getMessages()', () => {
        expect(MailService.getMessages).toBeCalledWith('/inbox');
    });
});
