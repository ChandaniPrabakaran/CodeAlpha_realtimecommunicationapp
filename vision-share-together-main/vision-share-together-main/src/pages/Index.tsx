
import React, { useState } from 'react';
import Login from '@/components/Login';
import MeetingRoom from '@/components/MeetingRoom';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const handleLogin = (email: string, name: string) => {
    setUser({ email, name });
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <MeetingRoom />;
};

export default Index;
