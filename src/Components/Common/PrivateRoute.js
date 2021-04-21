import React, { useState } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import moment from 'moment'
import jwt from 'jsonwebtoken'

export default function PrivateRoute({ component: Component, ...rest }) {
  const history = useHistory()
  const [token] = useState(sessionStorage.getItem("accessToken"));
  const remainingTime = moment.duration(moment(sessionStorage.getItem("accessTokenExp")).diff()).asMinutes()
  if(remainingTime <= 0){
    sessionStorage.clear(); history.push('/login')
  }
  
  return token ? (
    <Switch>
      <Route {...rest} render={props => <Component {...props} />} />
    </Switch>
  ) : (
    <Redirect
      to={{
        pathname: "/login"
      }}
    />
  );
}
