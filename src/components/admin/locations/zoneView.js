import React, { Component } from 'react';
import { Col, Row, Input } from 'antd';
import SearchInput from './searchInput';
import CoordinateInput from './coordinateInput';

const MAX_LENGTH = 30

export default class ZoneView extends Component {

  handleInputChange(field, e) {
    var zone = Object.assign({}, this.props.zone, {})
    zone[field] = e.target.value
    this.props.onZoneChange(zone)
  }

  onLocationSelect = (point, lat, lng) => {
    var zone = Object.assign({}, this.props.zone, {})

    if (point === 'south-west') {
      zone.south_west_lat = lat
      zone.south_west_long = lng
    } else if (point === 'north-east') {
      zone.north_east_lat = lat
      zone.north_east_long = lng
    }

    this.props.onZoneChange(zone)
  }
  
  render() {
    return (
      <div>
        <div className="isoBillingForm" style={{ 'paddingLeft': '30px' }}>
          <div className="isoInputFieldset">
            <Row>
              <Input
                addonBefore="Nombre de la zona"
                span={ 12 }
                value={ this.props.zone.label }
                maxLength={ MAX_LENGTH }
                onChange={ this.handleInputChange.bind(this, 'label') }
                disabled={ !this.props.edit }
              />
            </Row>
          </div>

          <Row>
            <Col span={11}>
              <Row>
                <CoordinateInput 
                  label="Latitud Suroeste" 
                  coordinate="south_west_lat"
                  value={ this.props.zone.south_west_lat }
                  onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
                  enabled={ this.props.edit }
                />
                <CoordinateInput 
                  label="Longitud Suroeste" 
                  coordinate="south_west_long"
                  value={ this.props.zone.south_west_long }
                  onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
                  enabled={ this.props.edit }
                />
              </Row>
              <Row>
              { 
                this.props.edit ? 
                <SearchInput 
                  onLocationSelect={(lat, lng) => { this.onLocationSelect('south-west', lat, lng) }} 
                /> : null 
              }
              </Row>
            </Col>

            <Col span={11} offset={1}>
              <Row>
                <CoordinateInput 
                  label="Latitud Noreste" 
                  coordinate="north_east_lat"
                  value={ this.props.zone.north_east_lat }
                  onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
                  enabled={ this.props.edit }
                />
                <CoordinateInput 
                  label="Longitud Noreste" 
                  coordinate="north_east_long"
                  value={ this.props.zone.north_east_long }
                  onLocationChange={ (field, e) => { this.handleInputChange(field, e) }}
                  enabled={ this.props.edit }
                />
              </Row>
              <Row>
              { 
                this.props.edit ? 
                <SearchInput 
                  onLocationSelect={(lat, lng) => { this.onLocationSelect('north-east', lat, lng) }} 
                /> : null 
              }
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}