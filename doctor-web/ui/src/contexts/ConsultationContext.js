import React, { createContext, useContext, useState } from 'react';

const ConsultationContext = createContext();

export const useConsultations = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error(
      'useConsultations must be used within a ConsultationProvider',
    );
  }
  return context;
};

export const ConsultationProvider = ({ children }) => {
  const [consultations, setConsultations] = useState([]);

  const addConsultation = (consultation) => {
    setConsultations((prev) => [...prev, consultation]);
  };

  const removeConsultation = (consultationId) => {
    setConsultations((prev) =>
      prev.filter((consultation) => consultation.id !== consultationId),
    );
  };

  const updateConsultation = (consultationId, updatedData) => {
    setConsultations((prev) =>
      prev.map((consultation) =>
        consultation.id === consultationId
          ? { ...consultation, ...updatedData }
          : consultation,
      ),
    );
  };

  const value = {
    consultations,
    addConsultation,
    removeConsultation,
    updateConsultation,
    setConsultations,
  };

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  );
};
