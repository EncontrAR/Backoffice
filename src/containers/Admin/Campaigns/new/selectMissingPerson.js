import React from 'react';
import { Input, Button, Col, Row } from 'antd';
import Table from '../../../../components/uielements/table';
import campaignActions from '../../../../redux/campaign/actions';
import { connect } from 'react-redux';

const {
  searchMissingPeople,
  preCreateCampaign
} = campaignActions;

class SelectMissingPerson extends React.Component {

  componentWillMount() {
    this.state = {
      searchDni: '',
      personSelected: {}
    }
  }

  handleInputChange(field, e) {
    this.setState({ searchDni: e.target.value })
  }

  handleSearch() {
    const searchDni = this.state.searchDni
    this.props.searchMissingPeople(searchDni)
  }

  handleSelect(field, value) {
    this.setState({ personSelected: field })
    var newCampaign = Object.assign({}, this.props.newCampaign, {})
    newCampaign.missing_person_id = field.id
    this.props.preCreateCampaign(newCampaign)
  }

  render() {

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
        <Button type="primary" onClick={this.handleSelect.bind(this, record)}>
          Seleccionar
        </Button>
      ),
    }];

    return (
      <div>
        <h4 style={{ marginTop: '15px' }}>Persona perdida</h4><br/>
        <Row type="flex" justify="start" style={{ marginBottom: '15px', alignItems: 'center' }}>
            <img 
              alt="#" 
              style={{ width: '50px', height: '50px' }}
              src={this.state.personSelected.photo} 
            />
            <Col style={{ marginLeft: '15px' }}>
              <h4>
                {this.state.personSelected.name}
              </h4>
              <h5>
                {this.state.personSelected.dni}
              </h5>
            </Col>
        </Row>

        <Row type="flex" justify="start">
          <Input
            style={{ width: '70%', marginRight: '10px' }}
            addonBefore="DNI"
            value={this.state.searchDni}
            onChange={this.handleInputChange.bind(this, 'dni')}
          />
          <Button type="primary" onClick={this.handleSearch.bind(this, 'dni')}>Buscar</Button>
        </Row>

        <div className="isoSimpleTable">
          <Table
            pagination={false}
            columns={ columns }
            dataSource={ this.props.availablePersons }
          />
        </div>
      </div>
    );
  }
}

SelectMissingPerson.defaultProps = {
  available_persons: []
};

function mapStateToProps(state) {
  const { new_campaign, available_persons } = state.Campaign;
  return {
    newCampaign: new_campaign,
    availablePersons: available_persons
  };
}

export default connect(mapStateToProps, { 
  searchMissingPeople,
  preCreateCampaign
})(SelectMissingPerson);