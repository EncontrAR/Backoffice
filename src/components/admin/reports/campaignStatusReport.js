import React from 'react';
import Table from '../../uielements/table';
import Pagination from '../../uielements/pagination';
import Button from '../../uielements/button';
import { Row, Col } from 'antd'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const initialPage = 1
const itemsPerPage = 10

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Título',
  key: 'title',
  render: (text, record) => (
    <span>
      { record.campaign.title.substring(0,20) }
    </span>
  )
}, {
  title: 'Fecha de creación',
  key: 'created_at',
  render: (text, record) => (
    <span>
      <Moment format="DD/MM/YYYY">{record.campaign.created_at}</Moment>
    </span>
  )
}, {
  title: 'Fecha de expiración',
  key: 'created_at',
  render: (text, record) => (
    <span>
      <Moment format="DD/MM/YYYY">{record.campaign.expire_date}</Moment>
    </span>
  )
}, {
  title: 'Acción',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/admin/campaigns/${record.campaign.id}`}>Ver detalle</Link>
    </span>
  ),
}];

export default class extends React.Component {

  componentWillMount() {
    this.props.loadPage('2017-01-01', '2017-12-31', initialPage, itemsPerPage)
  }

	handlePageChange = () => {
		//this.props.loadPage(5)
	}

	handleFilter = () => {
		//this.props.handleFilter(1,2)
	}

	render() {
		return (
      <div>
        <Row>
          <Col span={6}>
            <h2>{ this.props.title }</h2>
            <Button onClick={this.handleFilter}>Hola</Button>
          </Col>
        </Row>
        <br />
        <div className="isoSimpleTable">
          <Table
            pagination={ false }
            columns={ columns }
            dataSource={ this.props.campaigns }
          />
        </div>
        <br />
        <Pagination defaultPageSize={ itemsPerPage }  
          defaultCurrent={ initialPage } 
          total={ this.props.total_count }
          onChange={ this.props.handlePageChange } />
      </div>
		)
	}
}