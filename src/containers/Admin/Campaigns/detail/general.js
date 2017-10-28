import React from 'react';
import Modal from '../../../../components/feedback/modal';
import { Input, Button, Col, Row, DatePicker, Select } from 'antd';
import moment from 'moment-timezone';
import campaignActions from '../../../../redux/campaign/actions';
import { connect } from 'react-redux';

const { Option } = Select;
const TextArea = Input.TextArea;

const DATE_FORMAT = 'YYYY-MM-DD';
const TIMEZONE = 'America/Argentina/Buenos_Aires';

const {
  showCampaign,
  preUpdateCampaign,
  updateCampaign,
  deleteCampaign,
  clear
} = campaignActions;

class CampaignDetailGeneral extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edition: false,
      deleteModal: false
    }
  }

  componentWillMount() {
    this.props.showCampaign(this.props.campaignId)
    console.dir(this.props.campaign)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteSuccess) this.props.history.goBack()    
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

  handleOnDelete = () => {
    this.setState({ deleteModal: true })
  }

  handleDeleteCancel = () => {
    this.setState({ deleteModal: false })
  }

  handleDeleteOk = () => {
    this.props.deleteCampaign(this.props.campaignId)
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
             <Row type="flex" justify="space-around">
              <Button type="primary" size="small" onClick={this.handleOnPress}>{ this.state.edition ? 'Guardar' :  'Editar' }</Button>
              <Button type="default" size="small" onClick={this.handleOnCancel}>Cancelar</Button>
              <Button type="danger" size="small" onClick={this.handleOnDelete}>Borrar</Button>
              <Modal
                title="Borrar persona perdida"
                visible={this.state.deleteModal}
                onOk={this.handleDeleteOk}
                onCancel={this.handleDeleteCancel}>
                <p>¿Estás seguro que querés borrar la persona perdida?</p>
              </Modal>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col style={styleColLeft} span={18}>
            <Input
              addonBefore="Título"
              value={this.props.campaign.title}
              onChange={this.handleInputChange.bind(this, 'title')}
              disabled={!this.state.edition}
            />

            <h4 style={{ marginTop: '15px' }}>Descripción</h4>
            <TextArea
              value={this.props.campaign.description}
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
            <Select 
              value={this.props.campaign.status}
              onChange={ this.handleStatusChange }
              disabled={!this.state.edition}>

              <Option value="actived">Activada</Option>
              <Option value="deactivated">Desactivada</Option>
              <Option value="expired">Expirada</Option>
              <Option value="success">Exitosa</Option>

            </Select>

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
  const { campaign, deleteSuccess } = state.Campaign;
  console.dir(moment(campaign.expire_date, DATE_FORMAT))
  return {
    campaign: campaign,
    deleteSuccess: deleteSuccess
  };
}

export default connect(mapStateToProps, { 
  showCampaign, preUpdateCampaign, updateCampaign, deleteCampaign, clear
})(CampaignDetailGeneral);