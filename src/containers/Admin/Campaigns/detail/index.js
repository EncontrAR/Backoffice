import React from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import Box from '../../../../components/utility/box';
import { Tabs } from 'antd';
import General from './general'
import Alerts from '../../Alerts/Alerts'

const TabPane = Tabs.TabPane;

export default class CampaignDetail extends React.Component {
	render() {
		return (
	  	<LayoutWrapper className="isoCheckoutPage">
	  		<Box>
			  	<Tabs defaultActiveKey="1">
				    <TabPane tab="General" key="1"><General campaignId={this.props.match.params.id} /></TabPane>
				    <TabPane tab="Alertas" key="2"><Alerts campaignId={this.props.match.params.id} /></TabPane>
				  </Tabs>
	  		</Box>
			</LayoutWrapper>
		)
	}
}