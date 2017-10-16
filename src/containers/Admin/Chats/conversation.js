import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Row } from 'antd';
import Cable from 'actioncable';

const ulStyle = {
  'border': '1px solid #ccc',
  'height': '300px',
  'margin': '0',
  'padding': '10px',
  'margin-bottom': '10px',
  'border-radius': '3px',
  'list-style-type': 'none',
  'overflow-y': 'auto',
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

  scrollToBottom = () => {
    const elem = ReactDOM.findDOMNode(this.refs.listChat)

    if (elem) elem.scrollTop = elem.scrollHeight
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
          let chatLogs = this.state.chatLogs
          this.setState({ chatLogs: chatLogs.concat(stream.data) })
        } else if (stream.type === 'new_message') {
          let chatLogs = this.state.chatLogs
          chatLogs.push(stream.data)
          this.setState({ chatLogs: chatLogs })
        }

        this.scrollToBottom()
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
      const sender = msg.sender === 'user' ? 'Yo' : 'Finder'

      return (
        <li key={`chat_${msg.id}`}>
          <span className='chat-message'><b>{ sender }:</b> { msg.content }</span>
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

  handleChatInputKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

	render () {
		return (
      <div className="isoLayoutContentWrapper">
        <div className="isoLayoutContent">
  				<ul ref="listChat" style={ ulStyle }>
          	{ this.renderChatLog() }
          </ul>
          <Row type="flex" justify="start">
            <Input 
              style={{ width: '80%', marginRight: '10px' }}
              value={this.state.currentChatMessage}
              onChange={(e) => this.updateCurrentChatMessage(e)}
              onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
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