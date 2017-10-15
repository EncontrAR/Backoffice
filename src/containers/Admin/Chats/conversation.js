import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { messages } from './fakeData';
import Cable from 'actioncable';

const { TextArea } = Input.TextArea

export default class Conversation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: messages
    };
  }

  componentWillMount() {
    this.createSocket();
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable/');
    this.chats = cable.subscriptions.create({
    	user_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoxLCJleHAiOjE2MzQyMTg5NTZ9.OFHlyhaqqcfW2KJNWkh3WR0n8n8uFkBB74aZkBmejTs',
      channel: 'ChatChannel',
      campaign_id: '2',
      finder_id: '3'
    }, {
      connected: () => {
      	console.log('Connected')
      },
      received: (data) => {
        //let chatLogs = this.state.chatLogs;
        //chatLogs.push(data);
        //this.setState({ chatLogs: chatLogs });
        console.log(data)
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        });
      }
    });
  }

  renderChatLog() {
    return this.state.chatLogs.map((msg) => {
    	console.log('Hola ' + msg.content)
      return (
        <li key={`chat_${msg.id}`}>
          <span className='chat-message'>{ msg.content }</span>
        </li>
      );
    });
  }

	render () {
		return (
			<div>
				<ul>
        	{ this.renderChatLog() }
        </ul>
        <Input />
        <Button />
			</div>
		)
	}
}