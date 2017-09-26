import React from "react";
import { Switch, Route } from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";

class AdminRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${url}/campaigns`}
          component={asyncComponent(() => import("./Campaigns/Campaigns"))}
        />
        <Route
          exact
          path={`${url}/campaigns/new`}
          component={asyncComponent(() => import("./Campaigns/new/index.js"))}
        />
      </Switch>
    );
  }
}

export default AdminRouter;