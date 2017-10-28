import React from 'react';
import Table from '../../uielements/table';
import Pagination from '../../uielements/pagination';
import Button from '../../uielements/button';
import { Row, Col, DatePicker } from 'antd'
import Moment from 'react-moment';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

const DATE_FORMAT = 'YYYY-MM-DD';

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

  constructor(props) {
    super(props)
    this.state = {
      from: '2017-01-01',
      to: '2017-12-31',
      set_from: '2017-01-01',
      set_to: '2017-12-31',
      page: 1
    }
  }

  componentWillMount() {
    this.loadPage()
  }

	handlePageChange(page) {
    this.setState({ page: page }, () => {
      this.loadPage()
    })
	}

  handleSearch() {
    var component = this

    this.setState({ page: this.state.page, set_from: this.state.from, set_to: this.state.to }, () => {
      component.loadPage()
    })
  }

  handleDateChange(field, d) {
    this.setState({ [field]: new Date(d.format()) })
  }

  loadPage() {
    this.props.loadPage(this.state.set_from, this.state.set_to, this.state.page, itemsPerPage)
  }

	render() {
		return (
      <div>
        <h2>{ this.props.title }</h2>
        <Row>
          <Col type="flex" justify="space-between" span={18}>
            
            <DatePicker 
              onChange={ this.handleDateChange.bind(this, 'from') }
              value={ moment(this.state.from, DATE_FORMAT) } 
              format={ DATE_FORMAT } />

            <DatePicker 
              onChange={ this.handleDateChange.bind(this, 'to') }
              value={ moment(this.state.to, DATE_FORMAT) } 
              format={ DATE_FORMAT } />


            <Button onClick={ this.handleSearch.bind(this) }>Buscar</Button>
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
          defaultCurrent={ this.state.page } 
          total={ this.props.total_count }
          onChange={ this.handlePageChange.bind(this) } />
      </div>
		)
	}
}