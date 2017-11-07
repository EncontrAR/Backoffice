import React from 'react';
import { message, Input, Button, Col, Row, DatePicker, Select } from 'antd';
import moment from 'moment-timezone';
import campaignActions from '../../../../redux/campaign/actions';
import { connect } from 'react-redux';

const { Option } = Select;
const TextArea = Input.TextArea;

const DATE_FORMAT = 'YYYY-MM-DD';
const TIMEZONE = 'America/Argentina/Buenos_Aires';
const MAX_LENGTH_TITLE = 30;
const MAX_LENGTH_DESCRIPTION= 150;

const {
  showCampaign,
  preUpdateCampaign,
  updateCampaign,
  clear,
  clearMsg
} = campaignActions;

class CampaignDetailGeneral extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edition: false,
    }
  }

  componentWillMount() {
    this.props.showCampaign(this.props.campaignId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateSuccess) {
      message.success('Campaña actualizada correctamente')
    } else if (nextProps.updateFailure) {
      message.error('La campaña no pudo ser actualizada')
    }
    
    this.props.clearMsg()
  }

  componentWillUnmount() {
    this.props.clear()
  }

  handleOnPress = () => {
    if (this.state.edition) {
      this.props.updateCampaign(Object.assign({}, this.props.campaign, {}))
    }

    this.setState({ edition: !this.state.edition })
  }

  handleOnCancel = () => {
    this.setState({ edition: false })
  }

  handleInputChange(field, e) {
    var campaign = Object.assign({}, this.props.campaign, {})
    campaign[field] = e.target.value
    this.props.preUpdateCampaign(campaign)
  }

  handleExpireDateChange = (e, d) => {
    var date = moment(d.format())
    var campaign = Object.assign({}, this.props.campaign, {})
    campaign.expire_date = new Date(date.tz(TIMEZONE).format())
    this.props.preUpdateCampaign(campaign)
  }

  handleStatusChange = (value) => {
    var campaign = Object.assign({}, this.props.campaign, {})
    campaign.status = value
    this.props.preUpdateCampaign(campaign)
  }

  showStatus() {
    if (this.props.campaign.status !== 'expired') {
      return (
        <Select 
          value={this.props.campaign.status}
          onChange={ this.handleStatusChange }
          disabled={!this.state.edition}>

          <Option value="actived">Activada</Option>
          <Option value="canceled">Cancelada</Option>
          <Option value="success">Cerrada con éxito</Option>
          <Option value="failure">Cerrada sin éxito</Option>

        </Select>
      )
    } else {
      return (
        <Select 
          value={this.props.campaign.status}
          disabled={ true }>

          <Option value="expired">Expirada</Option>

        </Select>    
      )
    }
  }

  render() {

    var styleColLeft = {
      paddingLeft: '30px',
      paddingRight: '30px'
    }

    return (
      <div className="isoBillingAddressWrapper">

        <Row type="flex" justify="space-between">
          <Col span={5}>
            <h3 className="isoSectionTitle">{ this.state.edition ? 'Edición de campaña' :  'Detalle de campaña' }</h3>
          </Col>
          <Col span={7} offset={12}>
             <Row>
              <Button type="primary" size="small" onClick={this.handleOnPress}>{ this.state.edition ? 'Guardar' :  'Editar' }</Button>
              <Button type="default" size="small" onClick={this.handleOnCancel}>Cancelar</Button>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col style={styleColLeft} span={18}>
            <Input
              addonBefore="Título"
              value={this.props.campaign.title}
              maxLength={ MAX_LENGTH_TITLE }
              onChange={this.handleInputChange.bind(this, 'title')}
              disabled={!this.state.edition}
            />

            <h4 style={{ marginTop: '15px' }}>Descripción</h4>
            <TextArea
              value={this.props.campaign.description}
              maxLength={ MAX_LENGTH_DESCRIPTION }
              onChange={this.handleInputChange.bind(this, 'description')}
              disabled={!this.state.edition}
            />

            <h4 style={{ marginTop: '15px' }}>Fecha de expiración</h4>
            <DatePicker 
              onChange={this.handleExpireDateChange.bind(this, 'expire_date')}
              value={moment(this.props.campaign.expire_date, DATE_FORMAT)} 
              format={DATE_FORMAT}
              disabled={!this.state.edition} />

            <h4 style={{ marginTop: '15px' }}>Estado</h4><br/>
            { this.showStatus() }

            <h4 style={{ marginTop: '15px' }}>Persona perdida</h4><br/>
            <Row type="flex" justify="start" style={{ marginBottom: '15px', alignItems: 'center' }}>
                <img 
                  alt="#" 
                  style={{ width: '50px', height: '50px' }}
                  src={this.props.campaign.missing_person.photo} 
                />
                <Col style={{ marginLeft: '15px' }}>
                  <h4>
                    {this.props.campaign.missing_person.name}
                  </h4>
                  <h5>
                    {this.props.campaign.missing_person.dni}
                  </h5>
                </Col>
            </Row>

          </Col>
        </Row>
      </div>
    );
  }
}

CampaignDetailGeneral.defaultProps = {
  campaign: {}
};

function mapStateToProps(state) {
  const { campaign, updateSuccess, updateFailure } = state.Campaign;
  return {
    campaign: campaign,
    updateSuccess: updateSuccess,
    updateFailure: updateFailure
  };
}

export default connect(mapStateToProps, { 
  showCampaign, preUpdateCampaign, updateCampaign, clear, clearMsg
})(CampaignDetailGeneral);