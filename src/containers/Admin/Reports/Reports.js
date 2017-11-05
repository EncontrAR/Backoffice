import React from 'react';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Box from '../../../components/utility/box';
import ActiveCampaigns from './ActiveCampaigns';
import SuccessCampaigns from './SuccessCampaigns';
import ExpiredCampaigns from './ExpiredCampaigns';
import CanceledCampaigns from './CanceledCampaigns';
import AlertView from './AlertView';
import ConversationsZone from './ConversationsZone';
import TopZones from './TopZones';
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class Reports extends React.Component {
	render() {
		return (
	  	<LayoutWrapper className="isoCheckoutPage">
	  		<Box>
			  	<Tabs defaultActiveKey="1">
				    <TabPane tab="Campañas activas" key="1"><ActiveCampaigns /></TabPane>
				    <TabPane tab="Campañas exitosas" key="2"><SuccessCampaigns /></TabPane>
						<TabPane tab="Campañas expiradas" key="3"><ExpiredCampaigns /></TabPane>
						<TabPane tab="Campañas canceladas" key="4"><CanceledCampaigns /></TabPane>
						<TabPane tab="Alertas/Vistas" key="5"><AlertView /></TabPane>
						<TabPane tab="Reportes/Zonas" key="6"><ConversationsZone /></TabPane>
						<TabPane tab="Campañas/Zonas" key="7"><TopZones /></TabPane>
				  </Tabs>
	  		</Box>
			</LayoutWrapper>
		)
	}
}