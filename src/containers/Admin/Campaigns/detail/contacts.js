import React, { Component } from 'react';
import ContactList from '../../../../components/admin/conversations/contactList';
import campaignConversationsActions from '../../../../redux/campaignConversations/actions';
import { connect } from 'react-redux';

const {
  loadContacts,
  clear
} = campaignConversationsActions;

class Contacts extends Component {

  componentWillUnmount() {
    this.props.clear()
  }
  
  render() {
		return (
    	<ContactList
        conversations={ this.props.conversations }
        total_pages={ this.props.total_pages }
        total_count={ this.props.total_count }
        loadConversations={ (page, itemsPerPage) => { 
          this.props.loadContacts(this.props.campaignId, page, itemsPerPage) 
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  const { conversations, total_pages, total_count } = state.CampaignConversations;
  return {
    conversations: conversations,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { loadContacts, clear })(Contacts);