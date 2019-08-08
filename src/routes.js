// HOOK ROUTER
// import React from "react";
// import { useRoutes } from "hookrouter";
// import { NotFound } from "NotFound";
// import Login from "App";
// import ProjectPage from "containers/ProjectPage";

// const routes = {
//   "/": () => <Login />,
//   "/project": () => <ProjectPage />
//   // "/products": () => <App />,
//   // "/products/:id": ({ id }) => <App id={id} />
// };

// const Routes = () => {
//   const routeResult = useRoutes(routes);

//   return routeResult || <NotFound />;
// };
// export default Routes;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "pages/login/Login";
import { NotFound } from "pages/page404/NotFound";
import ProjectPage from "pages/ProjectPage";

const AppRouter = () => (
  <>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/projects" component={ProjectPage} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default AppRouter;
