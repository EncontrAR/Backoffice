import React from 'react';
import { Button } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const style = {
  root: {
    'zIndex': '1'
  }
}

export default class SearchInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = { address: '' }
    this.onChange = (address) => this.setState({ address })
  }

  handlePosSearch = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onLocationSelect(latLng.lat, latLng.lng))
      .catch(error => console.error('Error', error))
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
  	}

  	return (
	    <div>
	      <PlacesAutocomplete styles={ style } inputProps={ inputProps } />
        <Button
          style= {{ marginTop: '10px', 'zIndex': '0' }}
          type="primary" 
          size="small"
          onClick={ this.handlePosSearch }>Seleccionar</Button>
	    </div>
  	)
  }
}