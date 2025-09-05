import { createContext, useContext, useEffect, useState } from 'react';

interface TimeContextType {
  currentTime: Date;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const useTime = () => {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider');
  }
  return context;
};

interface TimeProviderProps {
  children: React.ReactNode;
}

export const TimeProvider = ({ children }: TimeProviderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider value={{ currentTime }}>
      {children}
    </TimeContext.Provider>
  );
};

