import React, { Component } from 'react';
import Table from '../../../components/uielements/table';
import Pagination from '../../../components/uielements/pagination';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import Button from '../../../components/uielements/button';
import zoneActions from '../../../redux/zone/actions';
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
}];

const itemsPerPage = 10

class Zones extends Component {

	constructor(props) {
		super(props);
		this.state = { page: 1 };
	}

	loadZonesPage() {
		this.props.indexAllZones(this.state.page, itemsPerPage)
	}

	componentWillMount() {
		this.loadZonesPage()
	}

	pageSelect = (e) => {
		this.setState(e)
		this.loadZonesPage()
	}
  
  render() {
		return (
    	<div>
    		<div className="isoSimpleTable">
		        <Table
		          pagination={false}
		          columns={ columns }
		          dataSource={ this.props.zones }
		        />
      		</div>
          <Box>
          	<ContentHolder>
          		<Pagination defaultPageSize={itemsPerPage} 
          			defaultCurrent={this.state.page} 
          			total={this.props.total_pages} 
          			onChange={this.pageSelect} />
            </ContentHolder>
          </Box>
          <Button type="primary">
            <Link to={'/admin/zones/new'}>Nueva zona</Link>
          </Button>
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