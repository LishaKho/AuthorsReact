import './App.css';
import { Router } from '@reach/router';
import AllAuthors from './components/AllAuthors';
import Create from './components/Create';
import Details from './components/Details';
import Edit from './components/Edit';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <AllAuthors default path="/authors" />
        <Create path="/authors/new" />
        <Details path="/authors/:id" />
        <Edit path="/authors/:id/edit" />
      </Router>
    </div>
  );
}

export default App;

