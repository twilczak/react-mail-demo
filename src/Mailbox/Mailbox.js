import React, { Component } from 'react';

import './Mailbox.css';

import { MailService } from "../MailService";

import { MailboxControls } from "./MailboxControls/MailboxControls";
import { MailboxList } from "./MailboxList/MailboxList";

export class Mailbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        this.loadMessages(this.props.match.path);
    }

    componentWillReceiveProps({match}) {
        this.loadMessages(match.path);
    }

    loadMessages(path) {
        this.setState({messages: []});
        MailService
            .getMessages(path)
            .then((response) => this.setState({messages: response.data}));
    }

    render() {
        return (
            <section className="mailbox">

                <MailboxControls match={this.props.match}/>
                <MailboxList match={this.props.match} messages={this.state.messages}/>

                <hr className="mailbox-border"/>

            </section>
        );
    }
}