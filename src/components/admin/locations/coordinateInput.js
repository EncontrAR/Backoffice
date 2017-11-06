import React from 'react';
import { Input } from 'antd';

const MAX_LENGTH = 15

export default class CoordinateInput extends React.Component {

  handleLocationChange(field, e) {
		if ((field.includes('lat') && this.isLatitude(e.target.value)) 
			|| (field.includes('long') && this.isLongitude(e.target.value))) {
		 	this.props.onLocationChange(field, e)
		}
  }

	isLatitude(lat) {
  	return isFinite(lat) && Math.abs(lat) <= 90
  }

  isLongitude(lng) {
  	return isFinite(lng) && Math.abs(lng) <= 180
	}

	render() {
		return (
      <div className="isoInputFieldset">
        <Input 
        	addonBefore={ this.props.label }
        	value={ this.props.value }
        	maxLength={ MAX_LENGTH }
        	onChange={ this.handleLocationChange.bind(this, this.props.coordinate) }
          disabled={ !this.props.enabled }
        />
      </div>
		)
	}
}