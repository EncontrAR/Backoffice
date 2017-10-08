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
        <Route
          exact
          path={`${url}/zones/new`}
          component={asyncComponent(() => import("./Zones/new/index.js"))}
        />
        <Route
          exact
          path={`${url}/zones/:id`}
          component={asyncComponent(() => import("./Zones/detail/index.js"))}
        />
        <Route
          exact
          path={`${url}/missingpeople`}
          component={asyncComponent(() => import("./MissingPeople/MissingPeople"))}
        />
        <Route
          exact
          path={`${url}/missingpeople/new`}
          component={asyncComponent(() => import("./MissingPeople/new/index.js"))}
        />
        <Route
          exact
          path={`${url}/missingpeople/:id`}
          component={asyncComponent(() => import("./MissingPeople/detail/index.js"))}
        />
        <Route
          exact
          path={`${url}/finders`}
          component={asyncComponent(() => import("./Finders/Finders"))}
        />
        <Route
          exact
          path={`${url}/finders/:id`}
          component={asyncComponent(() => import("./Finders/Finders"))}
        />
      </Switch>
    );
  }
}

export default AdminRouter;