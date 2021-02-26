import React, { useState } from 'react'
import './App.css';
import 'antd/dist/antd.css';
import PrivateRoutes from './component/private-routes/PrivateRoutes';
import localStorageService from './component/services/localStorageService'


function App() {
  const [role, setRole] = useState(localStorageService.getRole());

  return (
    <div>
      <PrivateRoutes role={role} setRole={setRole} />
    </div>

  );
}

export default App;
