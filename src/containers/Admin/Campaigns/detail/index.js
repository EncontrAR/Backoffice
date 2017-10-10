import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import Modal from '../../../../components/feedback/modal';
import { Input, Button, Col, Row } from 'antd';
import campaignActions from '../../../../redux/campaign/actions';
import { connect } from 'react-redux';

const TextArea = Input.TextArea;

const {
  showCampaign,
  preUpdateCampaign,
  updateCampaign,
  deleteCampaign
} = campaignActions;

class CampaignDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      edition: false,
      deleteModal: false
    }
  }

  componentWillMount() {
    this.props.showCampaign(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteSuccess) this.props.history.goBack()    
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
    this.props.deleteCampaign(this.props.match.params.id)
  }

  handleInputChange(field, e) {
    var campaign = Object.assign({}, this.props.campaign, {})
    campaign[field] = e.target.value
    this.props.preUpdateCampaign(campaign)
  }

  render() {

    var styleColLeft = {
      paddingLeft: '30px',
      paddingRight: '30px'
    }

    return (
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">

            <Row type="flex" justify="space-between">
              <Col span={4}>
                <h3 className="isoSectionTitle">Alta de campaña</h3>
              </Col>
              <Col span={7} offset={13}>
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
        </Box>
      </LayoutWrapper>
    );
  }
}

CampaignDetail.defaultProps = {
  campaign: {}
};

function mapStateToProps(state) {
  const { campaign, deleteSuccess } = state.Campaign;
  return {
    campaign: campaign,
    deleteSuccess: deleteSuccess
  };
}

export default connect(mapStateToProps, { 
  showCampaign, preUpdateCampaign, updateCampaign, deleteCampaign
})(CampaignDetail);