import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Button from '../../../components/uielements/button';
import missingPersonActions from '../../../redux/missing_person/actions';
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAllMissingPeople
} = missingPersonActions;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Nombre',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Apellido',
  dataIndex: 'lastname',
  key: 'lastname'
}, {
  title: 'DNI',
  dataIndex: 'dni',
  key: 'dni'
}, {
  title: 'Acción',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/admin/missingpeople/${record.id}`}>Ver detalle</Link>
    </span>
  ),
}];

const initialPage = 1
const itemsPerPage = 10

class MissingPeople extends Component {

  componentWillMount() {
    this.loadMissingPeoplePage(initialPage)
  }

	loadMissingPeoplePage = (page) => {
		this.props.indexAllMissingPeople(page, itemsPerPage)
	}
  
  render() {
		return (
    	<div>
        <div className="isoLayoutContentWrapper">
          <div className="isoLayoutContent">
            <Row type="flex" justify="space-between">
              <Col span={6}>
                <h2>Lista de personas perdidas</h2>
              </Col>
              <Col span={5}>
                <Button type="primary">
                  <Link to={'/admin/missingpeople/new'}>Nueva persona perdida</Link>
                </Button>
              </Col>
            </Row>
            <br />
      		  <div className="isoSimpleTable">
  		        <Table
  		          pagination={false}
  		          columns={ columns }
  		          dataSource={ this.props.missing_people }
  		        />
            </div>
            <br />
        		<Pagination defaultPageSize={ itemsPerPage }  
        			defaultCurrent={ initialPage } 
        			total={ this.props.total_count }
        			onChange={ this.loadMissingPeoplePage } />
          </div>
        </div>
    	</div>
    );
  }
}

function mapStateToProps(state) {
  const { missing_people, total_pages, total_count } = state.MissingPerson;

  return {
    missing_people: missing_people,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { indexAllMissingPeople })(MissingPeople);