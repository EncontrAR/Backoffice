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
        <Route
          exact
          path={`${url}/finders`}
          component={asyncComponent(() => import("./Finders/Finders"))}
        />
        <Route
          exact
          path={`${url}/users`}
          component={asyncComponent(() => import("./Users/Users"))}
        />
        <Route
          exact
          path={`${url}/zones`}
          component={asyncComponent(() => import("./Zones/Zones"))}
        />
      </Switch>
    );
  }
}

export default AdminRouter;