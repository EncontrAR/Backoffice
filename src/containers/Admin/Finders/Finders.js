import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import { Row, Col } from 'antd'
import finderActions from '../../../redux/finder/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAllFinders
} = finderActions;

const columns = [{
  title: 'Dispositivo',
  key: 'device_id',
  render: (text, record) => (
    <span>
      { record.device_id.substring(0,15) }
    </span>
  ),
}, {
  title: 'Sistema operativo',
  dataIndex: 'os',
  key: 'os'
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email'
}, {
  title: 'Nombre',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Apellido',
  dataIndex: 'lastname',
  key: 'lastname'
}, {
  title: 'Acción',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/admin/finders/${record.id}`}>Ver detalle</Link>
    </span>
  ),
}];

const initialPage = 1
const itemsPerPage = 10

class Finders extends Component {

	constructor(props) {
		super(props);
		this.state = { page: initialPage };
	}

	loadFindersPage() {
		this.props.indexAllFinders(this.state.page, itemsPerPage)
	}

	componentWillMount() {
		this.loadFindersPage()
	}

	pageSelect = (e) => {
		this.setState(e)
		this.loadFindersPage()
	}
  
  render() {
		return (
    	<div>
        <div className="isoLayoutContentWrapper">
          <div className="isoLayoutContent">
            <Row type="flex" justify="space-between">
              <Col span={4}>
                <h2>Lista de finders</h2>
              </Col>
            </Row>
            <br />
            <div className="isoSimpleTable">
              <Table
                pagination={false}
                columns={ columns }
                dataSource={ this.props.finders }
              />
            </div>
            <br />
            <Pagination defaultPageSize={itemsPerPage} 
              defaultCurrent={initialPage} 
              total={this.props.total_pages} 
              onChange={this.loadFindersPage} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { finders, total_pages, total_count } = state.Finder;
  return {
    finders: finders,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { indexAllFinders })(Finders);