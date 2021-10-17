import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import QuestionFeed from "./components/QuestionFeed";
import Home from "./components/Home";
import CreateQuestionForm from "./components/CreateQuestionForm"
import QuestionPage from "./components/QuestionPage";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            {sessionUser? <QuestionFeed /> : <Home />}
          </Route>
          <Route path='/feed'>
            {sessionUser? <QuestionFeed /> : <Home />}
          </Route>
          <Route exact path='/question'> 
            {sessionUser? <CreateQuestionForm /> : <Home />}
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='*'>
            <h2>Page Not Found</h2>
          </Route>
          <Route exact path='/question/:questionId'>
            <QuestionPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
