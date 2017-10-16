import React from 'react';
import { Button, Input, Row } from 'antd';
import Cable from 'actioncable';

const ulStyle = {
  'border': '1px solid #ccc',
  'height': '300px',
  'margin': '0',
  'padding': '10px',
  'margin-bottom': '10px',
  'border-radius': '3px',
  'list-style-type': 'none'
}

export default class Conversation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversationId: props.match.params.conversationId,
      currentChatMessage: '',
      chatLogs: []
    };
  }

  componentWillMount() {
    this.createSocket()
  }

  componentWillUnmount() {
    this.cable.disconnect()
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3000/cable/');
    this.cable = cable
    this.chats = cable.subscriptions.create({
    	user_token: localStorage.getItem('auth_token'),
      channel: 'ChatChannel',
      conversation_id: this.state.conversationId
    }, {
      connected: () => {
        this.chats.historial()
      },
      received: (stream) => {
        if (stream.type === 'historial') {
          console.log('Historial')
          let chatLogs = this.state.chatLogs
          this.setState({ chatLogs: chatLogs.concat(stream.data) })
        } else if (stream.type === 'new_message') {
          let chatLogs = this.state.chatLogs
          chatLogs.push(stream.data)
          this.setState({ chatLogs: chatLogs })
        }
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        })
      },
      historial: function() {
        this.perform('historial')
      }
    });
  }

  renderChatLog() {
    return this.state.chatLogs.map((msg) => {
      return (
        <li key={`chat_${msg.id}`}>
          <span className='chat-message'>{ msg.content }</span>
        </li>
      );
    });
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage);
    this.setState({ currentChatMessage: '' });
  }

	render () {
		return (
      <div className="isoLayoutContentWrapper">
        <div className="isoLayoutContent">
  				<ul style={ ulStyle }>
          	{ this.renderChatLog() }
          </ul>
          <Row type="flex" justify="start">
            <Input 
              style={{ width: '80%', marginRight: '10px' }}
              value={this.state.currentChatMessage}
              onChange={(e) => this.updateCurrentChatMessage(e)}
            />
            <Button 
              type="primary" 
              onClick={(e) => this.handleSendEvent(e)}>
              Enviar
            </Button>
          </Row>
        </div>
      </div>
		)
	}
}