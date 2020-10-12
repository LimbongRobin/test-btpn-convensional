import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes";
// import SideBar from "../sidebar";
import Header from "../header-component/header.component"
import "./default-layout.styles.scss";
// import  global  from '../../global/global';

// import Auth from '../../auth/auth';

// const DefaultAside = React.lazy(() => import("./DefaultAside"));
// const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
// const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <header>
          <Suspense>
            {/* <AppSidebarNav navConfig={this.state.navData} {...this.props} /> */}
            <Header style={{ position: "fixed" }}></Header>
          </Suspense>
          </header>
          <main>
            <div className="main">
            <Suspense fallback={this.loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/body" />
              </Switch>
            </Suspense>
          
            </div>
           
          </main>
        </div>
      </div>
    );
  }
}

export default DefaultLayout;
