import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Button from '../../../components/uielements/button';
import { Row, Col } from 'antd';
import Moment from 'react-moment';
import userActions from '../../../redux/user/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAllUsers
} = userActions;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email'
}, {
  title: 'Nombre',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Apellido',
  dataIndex: 'lastname',
  key: 'lastname',
}, {
  title: 'Fecha de creación',
  key: 'created_at',
  render: (text, record) => (
    <span>
      <Moment format="DD/MM/YYYY">{record.created_at}</Moment>
    </span>
  )
}];

const initialPage = 1
const itemsPerPage = 10

class Users extends Component {

	componentWillMount() {
		this.loadUsersPage(initialPage)
	}

  loadUsersPage = (page) => {
    this.props.indexAllUsers(page, itemsPerPage)
  }
  
  render() {
		return (
      <div className="isoLayoutContentWrapper">
        <div className="isoLayoutContent">
          <Row>
            <Col span={6}>
              <h2>Lista de usuarios</h2>
            </Col>
            <Col span={4} offset={14}>
              <Button type="primary">
                <Link to={'/admin/users/new'}>Nuevo usuario</Link>
              </Button>
            </Col>
          </Row>
          <br />
      		<div className="isoSimpleTable">
  	        <Table
  	          pagination={ false }
  	          columns={ columns }
  	          dataSource={ this.props.users }
  	        />
      		</div>
          <br />
      		<Pagination defaultPageSize={ itemsPerPage } 
      			defaultCurrent={ initialPage } 
      			total={ this.props.total_count } 
      			onChange={ this.loadUsersPage } />
      	</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, total_pages, total_count } = state.User;
  return {
    users: users,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { indexAllUsers })(Users);