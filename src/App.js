
import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { isLoggedInVar, darkModeVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import NotFound from './screens/NotFound';
import { darkTheme, GlobalStyles, lightTheme } from './styles';


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkmode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkmode? darkTheme:lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {
              isLoggedIn? <Home />:<Login />
            }
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

// Switch : one route at a time
// url:login --router searched-> component:Login
export default App;
