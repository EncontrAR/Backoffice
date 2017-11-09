import React from 'react';
import Table from '../../../components/uielements/table';
import Button from '../../../components/uielements/button';
import renderTitle from '../../../helpers/text/filter';
import { Row, Col, DatePicker } from 'antd';
import moment from 'moment-timezone';
import reportActions from '../../../redux/report/actions';
import { connect } from 'react-redux';

const {
  indexTopZones
} = reportActions;

const DATE_FORMAT = 'YYYY-MM-DD';

const columns = [{
  title: 'Id',
  key: 'id',
  render: (text, record) => (
    <span>
      { record.id }
    </span>
  )
}, {
  title: 'Zona',
  key: 'zone',
  render: (text, record) => (
    <span>
      { renderTitle(record.label) }
    </span>
  )
}, {
  title: 'Campañas',
  key: 'campaigns',
  render: (text, record) => (
    <span>
      { record.count }
    </span>
  )
}];

class TopZones extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      from: '2017-01-01',
      to: '2017-12-31',
      set_from: '2017-01-01',
      set_to: '2017-12-31'
    }
  }

  componentWillMount() {
    this.loadTopZones()
  }

	loadTopZones = () => {
		this.props.indexTopZones(this.state.set_from, this.state.set_to)
	}

  handleDateChange(field, d) {
    this.setState({ [field]: new Date(d.format()) })
  }

  handleSearch() {
    var component = this

    this.setState({ set_from: this.state.from, set_to: this.state.to }, () => {
      component.loadTopZones()
    })
  }

	render() {
		return (
      <div>
        <h2>Campañas por zona</h2>
        <br />
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
            dataSource={ this.props.campaigns_per_zone }
          />
        </div>
      </div>
		)
	}
}

function mapStateToProps(state) {
  const { campaigns_per_zone } = state.Report;
  return {
    campaigns_per_zone: campaigns_per_zone
  };
}

export default connect(mapStateToProps, { indexTopZones })(TopZones);