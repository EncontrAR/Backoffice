import React from 'react';
import Table from '../../../components/uielements/table';
import Button from '../../../components/uielements/button';
import { Row, Col, DatePicker } from 'antd';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import reportActions from '../../../redux/report/actions';
import { connect } from 'react-redux';

const {
  indexAlertViews
} = reportActions;

const DATE_FORMAT = 'YYYY-MM-DD';

const columns = [{
  title: 'Id de campaña',
  key: 'id',
  render: (text, record) => (
    <span>
      { record.campaign.id }
    </span>
  )
}, {
  title: 'Título',
  key: 'title',
  render: (text, record) => (
    <span>
      { record.campaign.title.substring(0,20) }
    </span>
  )
}, {
  title: 'Alerta',
  key: 'alert_title',
  render: (text, record) => (
    <span>
      { record.title.substring(0,20) }
    </span>
  )
}, {
  title: 'Notificaciones',
  key: 'notifications_sent',
  render: (text, record) => (
    <span>
      { record.notifications_sent }
    </span>
  )
}, {
  title: 'Vistas',
  key: 'views',
  render: (text, record) => (
    <span>
      { record.views }
    </span>
  )
}, {
  title: 'Fecha de creación',
  key: 'created_at',
  render: (text, record) => (
    <span>
      <Moment format="DD/MM/YYYY">{record.created_at}</Moment>
    </span>
  )
}];

class AlertView extends React.Component {

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
    this.loadAlertViews()
  }

	loadAlertViews = () => {
		this.props.indexAlertViews(this.state.set_from, this.state.set_to)
	}

  handleDateChange(field, d) {
    this.setState({ [field]: new Date(d.format()) })
  }

  handleSearch() {
    var component = this

    this.setState({ set_from: this.state.from, set_to: this.state.to }, () => {
      component.loadAlertViews()
    })
  }

	render() {
		return (
      <div>
        <h2>Alertas/Vistas</h2>
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
            dataSource={ this.props.alert_views }
          />
        </div>
      </div>
		)
	}
}

function mapStateToProps(state) {
  const { alert_views } = state.Report;
  return {
    alert_views: alert_views
  };
}

export default connect(mapStateToProps, { indexAlertViews })(AlertView);