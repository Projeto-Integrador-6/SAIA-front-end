import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
import Results from './pages/Results';

import history from './history/index';

export default function Routes() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/forgotten_password" component={ForgottenPassword} />
        <Route path="/home" component={Home} />
        <Route path="/educational_test" component={EducationalTest} />
        <Route path="/manager/educational_test/edit" component={EditEducationalTest} />
        <Route path="/manager/educational_test/create" component={CreateEducationalTest} />
        <Route path="/manager/educational_test" component={EducationalTestManager} />
        <Route path="/manager/questions/edit" component={EditQuestions} />
        <Route path="/manager/questions/create" component={CreateQuestions} />
        <Route path="/manager/questions" component={Questions} />
        <Route path="/manager/enforcement/create" component={CreateEnforcement} />
        <Route path="/manager/enforcement" component={Enforcement} />
        <Route path="/educational_test/test" component={EducationalTestInProgress} />
        <Route path="/manager/results" component={Results} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}