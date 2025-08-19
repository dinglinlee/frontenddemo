import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImageData {
  id: string;
  name: string;
  date: string;
  location: string;
  url: string;
  type: 'pre' | 'post';
}

interface DataContextType {
  images: ImageData[];
  setImages: (images: ImageData[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <DataContext.Provider value={{
      images,
      setImages,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};