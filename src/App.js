import './App.css';
import store from "./Component/Redux/Store";
import { Provider as StoreProvider } from "react-redux";
import TableShowPoint from './Component/TableShowPoint'
import BottomPaging from './Component/BottomPaging';
import {
  BrowserRouter as Router,
  Link,
  useParam
} from "react-router-dom";
function App() {
  return (
    <StoreProvider store={store}>
      <Router>
        <div className="App">
          <TableShowPoint />
          <BottomPaging />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
