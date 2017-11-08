import React, { Component } from 'react';
import ContactList from '../../../components/admin/conversations/contactList';
import chatActions from '../../../redux/chat/actions';
import { connect } from 'react-redux';

const {
  indexAllConversations
} = chatActions;

class Chats extends Component {
  
  render() {
		return (
    	<ContactList
        conversations={ this.props.conversations }
        total_pages={ this.props.total_pages }
        total_count={ this.props.total_count }
        loadConversations={ (page, itemsPerPage) => { this.props.indexAllConversations(page, itemsPerPage) }}
      />
    );
  }
}

function mapStateToProps(state) {
  const { conversations, total_pages, total_count } = state.Chat;
  return {
    conversations: conversations,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { indexAllConversations })(Chats);