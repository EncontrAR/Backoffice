import React, { Component } from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Button, Col, Row, Input } from 'antd';
import { Link } from 'react-router-dom';
import finderActions from '../../../../redux/finder/actions';
import { connect } from 'react-redux';
const { TextArea } = Input;

const { showFinder, clear } = finderActions;

class FinderDetail extends Component {

	constructor(props) {
		super(props)
		this.state = {
			'editable': 'false'
		}
	}

  componentWillMount() {
    this.props.showFinder(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clear()
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
				      	<h3 className="isoSectionTitle">Detalle de finder</h3>
				      </Col>
				      <Col span={2} type="flex" justify="end">
								<Button type="default" size="small">
                	<Link to={'/admin/finders'}>Volver</Link>
                </Button>
				      </Col>
				    </Row>

				    <Row>
				    	<Col span={12} style={ styleColLeft }>

				    		<h4>Dispositivo</h4>
	              <TextArea
	              	style={{ 'marginTop': '10px' }}
	              	placeholder={this.props.finder.device_id}
	              	autosize={{ minRows: 2, maxRows: 6 }}
	              	disabled={this.state.editable}
	              />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="Sistema operativo"
                  value={this.props.finder.os}
                  disabled={this.state.editable}
                />

                <Input
                  style={{ 'marginTop': '30px' }}
                  addonBefore="DNI"
                  value={this.props.finder.dni}
                  disabled={this.state.editable}
                />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="Email"
                  value={this.props.finder.email}
                  disabled={this.state.editable}
                />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="Nombre"
                  value={this.props.finder.name}
                  disabled={this.state.editable}
                />

                <Input
                	style={{ 'marginTop': '30px' }}
                  addonBefore="Apellido"
                  value={this.props.finder.lastname}
                  disabled={this.state.editable}
                />

				    	</Col>
				    </Row>

	        </div>
	      </Box>
	    </LayoutWrapper>
		)
	}

}

FinderDetail.defaultProps = {
  finder: {
  	device_id: '-',
  	os: '-',
    dni: '-',
 		email: '-',
  	name: '-',
  	lastname: '-'
  }
};

function mapStateToProps(state) {
	const { finder } = state.Finder;
  return {
    finder: finder
  };
}

export default connect(mapStateToProps, { showFinder, clear })(FinderDetail)