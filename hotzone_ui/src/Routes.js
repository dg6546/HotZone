import React from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NotFound from "./Components/NotFound";
import ChangePassword from "./Components/ChangePassword";

const authGuard = (Component) => () => {
    return localStorage.getItem("token") ? (
        <Component />
    ) : (
        // <Redirect to="/login" />
        <Component />
    );
};

const logout = ()=>{
    localStorage.clear();
    return <Login />
}

const Routes = (props) => (
    <Router {...props}>
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/dashboard" render={authGuard(Dashboard)}/>
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route path="/logout" render={logout}/>
            <Route path="/change-password" >
                <ChangePassword />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    </Router>
);
export default Routes;