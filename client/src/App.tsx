import './App.scss';
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Outlet />
    </div>
  );
}

export default App;
