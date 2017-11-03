import React, { Component } from 'react';

import './MessageComposer.css';

import { MessageForm } from './MessageForm/MessageForm';

export class MessageComposer extends Component {

    constructor(props) {
        super(props);

        this.onSend = this.onSend.bind(this);
    }

    onSend (message) {
        console.log('onSend not yet implemented', message);
    }

    render() {
        return (
            <MessageForm match={this.props.match} onSend={this.onSend}/>
        );
    }
}