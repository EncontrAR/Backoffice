import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Button, Tabs, Row } from 'antd';
import General from './general';
import CampaignImages from './images';
import Alerts from '../../Alerts/Alerts';

const TabPane = Tabs.TabPane;

export default class CampaignDetail extends React.Component {
	render() {
		return (
	  	<LayoutWrapper className="isoCheckoutPage">
	  		<Box>
	  			<Row type="flex" justify="end">
	  				<Button type="default" size="small" onClick={() => this.props.history.goBack()}>Volver</Button>
  				</Row>
			  	<Tabs defaultActiveKey="1">
				    <TabPane tab="General" key="1"><General campaignId={this.props.match.params.id} /></TabPane>
				    <TabPane tab="Alertas" key="2"><Alerts campaignId={this.props.match.params.id} /></TabPane>
				    <TabPane tab="Imágenes" key="3"><CampaignImages campaignId={this.props.match.params.id} /></TabPane>
				  </Tabs>
	  		</Box>
			</LayoutWrapper>
		)
	}
}