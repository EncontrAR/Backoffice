import React from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const initialPage = 1
const itemsPerPage = 10

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

export default class ContactList extends React.Component {

  componentWillMount() {
    this.load(initialPage)
  }

	load = (page) => {
		this.props.loadConversations(page, itemsPerPage)
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
        			onChange={ this.load } />
          </div>
        </div>
    	</div>
    );
  }
}