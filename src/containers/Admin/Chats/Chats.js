import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import chatActions from '../../../redux/chat/actions';
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAllConversations
} = chatActions;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Campaña',
  key: 'campaign',
  render: (text, record) => (
    <span>
      {`#${record.campaign.id} - ${record.campaign.title}`}
    </span>
  )
}, {
  title: 'Finder id',
  dataIndex: 'finder_id',
  key: 'finder_id'
}, {
  title: 'Acción',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/admin/conversations/${record.id}/finders/${record.finder_id}`}>Abrir conversación</Link>
    </span>
  ),
}];

const initialPage = 1
const itemsPerPage = 10

class Chats extends Component {

  componentWillMount() {
    this.loadConversations(initialPage)
  }

	loadConversations = (page) => {
		this.props.indexAllConversations(page, itemsPerPage)
	}
  
  render() {
		return (
    	<div>
        <div className="isoLayoutContentWrapper">
          <div className="isoLayoutContent">
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <h2>Lista de conversaciones</h2>
              </Col>
            </Row>
            <br />
      		  <div className="isoSimpleTable">
  		        <Table
  		          pagination={false}
  		          columns={ columns }
  		          dataSource={ this.props.conversations }
  		        />
            </div>
            <br />
        		<Pagination defaultPageSize={ itemsPerPage }  
        			defaultCurrent={ initialPage } 
        			total={ this.props.total_count }
        			onChange={ this.loadConversations } />
          </div>
        </div>
    	</div>
    );
  }
}

function mapStateToProps(state) {
  const { conversations } = state.Chat;

  return {
    conversations: conversations
  };
}

export default connect(mapStateToProps, { indexAllConversations })(Chats);