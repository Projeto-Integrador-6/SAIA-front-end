import React, { useContext } from "react"
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Loading from './components/Loading';

import Login from './pages/Login';
import Home from './pages/Home';
import CreateEducationalTest from "./pages/CreateEducationalTest";
import EducationalTest from "./pages/EducationalTest";
import EducationalTestManager from "./pages/EducationalTestManager";
import EducationalTestInProgress from "./pages/EducationalTestInProgress/EducationalTestInProgress";
import ForgottenPassword from "./pages/ForgottenPassword";
import CreateQuestions from "./pages/CreateQuestions";
import Questions from "./pages/Questions";
import CreateEnforcement from "./pages/CreateEnforcement";
import Enforcement from "./pages/Enforcement";
import EditQuestions from "./pages/EditQuestions";
import EditEducationalTest from "./pages/EditEducationalTest";
import UserProfile from "./pages/UserProfile";
import Results from './pages/Results';
import GeneralResults from './pages/GeneralResults'

import history from './history/index';

import { AuthContext } from "./contexts/AuthContext";

// Rotas permitidas enquanto estiver não estiver autenticado.
function NoAuthRoute({...rest}) {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <Loading/>;
  }

  if(user){
    return <Redirect to="/home" />
  }

  return <Route {...rest} />;
}

// Rotas permitidas enquanto estiver estiver autenticado.
function PrivateRoute({ isPrivate, ...rest}) {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <Loading/>;
  }

  if (isPrivate && !user) {
    return <Redirect to="/login" />
  }
  
  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute isPrivate path="/home" component={Home} />
        <PrivateRoute isPrivate path="/profile" component={UserProfile} />
        <PrivateRoute isPrivate path="/educational_test/test" component={EducationalTestInProgress} />
        <PrivateRoute isPrivate path="/educational_test" component={EducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test/results" component={Results} />
        <PrivateRoute isPrivate path="/manager/educational_test/edit" component={EditEducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test/create" component={CreateEducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test" component={EducationalTestManager} />
        <PrivateRoute isPrivate path="/manager/questions/edit" component={EditQuestions} />
        <PrivateRoute isPrivate path="/manager/questions/create" component={CreateQuestions} />
        <PrivateRoute isPrivate path="/manager/questions" component={Questions} />
        <PrivateRoute isPrivate path="/manager/enforcement/create" component={CreateEnforcement} />
        <PrivateRoute isPrivate path="/manager/enforcement" component={Enforcement} />
        <PrivateRoute isPrivate path="/manager/general_results" component={GeneralResults} />
        <NoAuthRoute path="/forgotten_password" component={ForgottenPassword} />
        <NoAuthRoute path="/" component={Login} />
      </Switch>
    </Router>
  )
}