import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Button, Col, Row, Input } from 'antd';

class ZoneDetail extends Component {

  constructor(props) {
    super(props)
    this.state = { edition: false }
  }

	enableEdition = () => {
		const newEditionState = !this.state.edition

		this.setState(
			{ 
				edition: newEditionState
			})
	}
  
  render() {
		return (
      <LayoutWrapper className="isoCheckoutPage">
        <Box>
          <div className="isoBillingAddressWrapper">

				    <Row type="flex" justify="space-between">
				      <Col span={4}>
				      	<h3 className="isoSectionTitle">{ this.state.edition ? 'Edición de zona' :  'Detalle de zona' }</h3>
				      </Col>
				      <Col span={4}>
				      	 <div>
	                <Button type="primary" size="small" onClick={this.enableEdition}>{ this.state.edition ? 'Guardar' :  'Editar' }</Button>
	                <Button type="danger" size="small">Cancelar</Button>
	              </div>
				      </Col>
				    </Row>

            <div className="isoBillingSection">
              <div className="isoBillingForm">
                <div className="isoInputFieldset">
                  <Input
                    label="Nombre"
                    placeholder="Nombre de la zona"
                    disabled={!this.state.edition}
                  />
                </div>

                <Row type="flex" justify="start">
						      <Col span={12}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	label="Latitud inferior" 
		                  	placeholder="Latitud inferior" 
		                  	disabled={!this.state.edition}
		                  />
		                </div>
						      </Col>
						      <Col span={12}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	label="Latitud superior" 
		                  	placeholder="Latitud superior" 
		                  	disabled={!this.state.edition}
		                 	/>
		                </div>
						      </Col>
						    </Row>

                <Row type="flex" justify="start">
						      <Col span={12}>
		                <div className="isoInputFieldset">
		                  <Input 
			                  label="Longitud inferior" 
			                  placeholder="Longitud inferior" 
			                  disabled={!this.state.edition}
			                />
		                </div>
						      </Col>
						      <Col span={12}>
		                <div className="isoInputFieldset">
		                  <Input 
		                  	label="Longitud superior" 
		                  	placeholder="Longitud superior"
		                  	disabled={!this.state.edition}
		                  />
		                </div>
						      </Col>
						    </Row>
              </div>
            </div>
          </div>
        </Box>
      </LayoutWrapper>
    );
  }
}

export default ZoneDetail