import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Select, DatePicker } from 'antd';
import InputBox from './input-box';
import IntlMessages from '../../../../components/utility/intlMessages';
import campaignActions from '../../../../redux/campaign/actions';
import { connect } from 'react-redux';

const {
  createCampaign
} = campaignActions;

const Option = Select.Option;

const missing_people = [
  { id: 1, name: "Melisa", dni: "35.675.123" },
  { id: 2, name: "María", dni: "28.425.029" },
  { id: 3, name: "Juana", dni: "28.321.456" }
]

class NewCampaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = { missing_people: missing_people };
  }

  renderMissingPersonOptions = () => {
    return (
      this.state.missing_people.map(m => <Option key={m.id} value={`${m.name} (${m.dni})`}>{`${m.name} (${m.dni})`}</Option>)
    )
  }

  render() {
    return (
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">
            <h3 className="isoSectionTitle">Alta de campaña</h3>
            <div className="isoBillingSection">
              <div className="isoBillingForm">
                <div className="isoInputFieldset">
                  <InputBox
                    label={<IntlMessages id="admin.campaign.new.title" />}
                    placeholder="Título de campaña"
                    important
                  />
                </div>

                <div className="isoInputFieldset">
                  <InputBox
                    label={<IntlMessages id="admin.campaign.new.description" />}
                    placeholder="Descripción de campaña"
                    important
                  />
                </div>

                <h3>Fecha de expiración</h3><br/>
                <div className="isoInputFieldset">
                  <DatePicker placeholder="Fecha de expiración" />
                </div>

                <h3>Persona perdida</h3><br/>
                <Select
                  mode="combobox"
                  placeholder="DNI de persona perdida"
                  notFoundContent="No hay resultados"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                >
                  { this.renderMissingPersonOptions() }
                </Select>
              </div>
            </div>
          </div>
        </Box>
      </LayoutWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { campaigns } = state.Campaign;
  return {
    campaigns: campaigns
  };
}

export default connect(mapStateToProps, { createCampaign })(NewCampaign);