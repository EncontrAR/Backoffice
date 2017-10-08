import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Button from '../../../components/uielements/button';
import zoneActions from '../../../redux/zone/actions';
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const {
  indexAllZones
} = zoneActions;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id'
}, {
  title: 'Zona',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Latitud inferior',
  dataIndex: 'south_west_lat',
  key: 'south_west_lat'
}, {
  title: 'Longitud inferior',
  dataIndex: 'south_west_long',
  key: 'south_west_long'
}, {
  title: 'Latitud superior',
  dataIndex: 'north_east_lat',
  key: 'north_east_lat'
}, {
  title: 'Longitud superior',
  dataIndex: 'north_east_long',
  key: 'north_east_long'
}, {
  title: 'Acción',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to={`/admin/zones/${record.id}`}>Ver detalle</Link>
    </span>
  ),
}];

const initialPage = 1
const itemsPerPage = 10

class Zones extends Component {

  componentWillMount() {
    this.loadZonesPage(initialPage)
  }

	loadZonesPage = (page) => {
		this.props.indexAllZones(page, itemsPerPage)
	}
  
  render() {
		return (
    	<div>
        <div className="isoLayoutContentWrapper">
          <div className="isoLayoutContent">
            <Row type="flex" justify="space-between">
              <Col span={4}>
                <h2>Lista de zonas</h2>
              </Col>
              <Col span={4}>
                <Button type="primary">
                  <Link to={'/admin/zones/new'}>Nueva zona</Link>
                </Button>
              </Col>
            </Row>
            <br />
      		  <div className="isoSimpleTable">
  		        <Table
  		          pagination={false}
  		          columns={ columns }
  		          dataSource={ this.props.zones }
  		        />
            </div>
            <br />
        		<Pagination defaultPageSize={itemsPerPage} 
        			defaultCurrent={initialPage} 
        			total={this.props.total_pages} 
        			onChange={this.loadZonesPage} />
          </div>
        </div>
    	</div>
    );
  }
}

function mapStateToProps(state) {
  const { zones, total_pages, total_count } = state.Zone;
  return {
    zones: zones,
    total_pages: total_pages,
    total_count: total_count
  };
}

export default connect(mapStateToProps, { indexAllZones })(Zones);