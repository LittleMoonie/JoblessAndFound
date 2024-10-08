// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Dashboard from './Components/Dashboard/Dashboard';
import SignIn from './Components/Authentication/SignIn';

const App: React.FC = () => {
  return (
    <Router>
      <Container maxWidth="sm"> {/* Example MUI Container */}
          <Route path="/signin" Component={SignIn} />
          <Route path="/dashboard" Component={Dashboard} />
          {/* Add other routes as necessary */}
      </Container>
    </Router>
  );
};

export default App;
