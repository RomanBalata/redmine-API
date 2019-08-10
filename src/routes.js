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
import Issues from "pages/issues/Issues";
import SingleIssues from "pages/issues/SingleIssues";

const AppRouter = () => (
  <>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/projects" component={ProjectPage} />
      <Route exact path="/issues" component={Issues} />
      <Route path="/issues/:id" component={SingleIssues} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default AppRouter;
