import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";
//every where a component is used in another component it must be imported first

const Router = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={NotFound}/>
    </Switch>
    </BrowserRouter>
);
// choosing to use Route path instead of Route exact gives room for different children pages under the same parent

export default Router;
//you must always import code definitions, define the component then export it to be used by the app