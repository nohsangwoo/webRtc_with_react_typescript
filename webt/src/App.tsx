import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './Styles/Theme';
import GlobalStyles from './Styles/GlobalStyles';
import Room from './routes/room';
import SimpleChat from './routes/simpleChat/Container';
import CreateRoom from './routes/CreateRoom';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      {/* <SimpleChat /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={CreateRoom} />
          <Route path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
