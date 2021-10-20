import React, { useContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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

import history from './history/index';

import { AuthContext } from "./contexts/AuthContext";


function NoAuthRoute({...rest}) {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return 'Carregando...'
  }

  if(user){
    return <Redirect to="/home" />
  }

  return <Route {...rest} />;
}

// Rotas permitidas enquanto estiver estiver autenticado.
function PrivateRoute({ isPrivate, isManagement, isEmployee, isCustomer, ...rest}) {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return 'Carregando...'
  }

  if (isPrivate && !user) {
    return <Redirect to="/login" />
  }
  
  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <PrivateRoute isPrivate path="/home" component={Home} />
        <PrivateRoute isPrivate path="/profile" component={UserProfile} />
        <PrivateRoute isPrivate path="/educational_test/test" component={EducationalTestInProgress} />
        <PrivateRoute isPrivate path="/educational_test" component={EducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test/edit" component={EditEducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test/create" component={CreateEducationalTest} />
        <PrivateRoute isPrivate path="/manager/educational_test" component={EducationalTestManager} />
        <PrivateRoute isPrivate path="/manager/questions/edit" component={EditQuestions} />
        <PrivateRoute isPrivate path="/manager/questions/create" component={CreateQuestions} />
        <PrivateRoute isPrivate path="/manager/questions" component={Questions} />
        <PrivateRoute isPrivate path="/manager/enforcement/create" component={CreateEnforcement} />
        <PrivateRoute isPrivate path="/manager/enforcement" component={Enforcement} />
        <PrivateRoute isPrivate path="/manager/results" component={Results} />
        <NoAuthRoute path="/forgotten_password" component={ForgottenPassword} />
        <NoAuthRoute path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}