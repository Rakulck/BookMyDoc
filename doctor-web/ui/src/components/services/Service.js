import React, { useState } from 'react';
import { useConsultations } from '../../contexts/ConsultationContext';
import './Service.css';

const Service = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newConsultation, setNewConsultation] = useState({
    name: '',
    duration: '',
    price: '',
    description: '',
  });

  const { consultations, addConsultation } = useConsultations();

  // Only show custom consultations
  const consultationTypes = consultations;

  const handleCreateConsultation = () => {
    setShowCreateForm(true);
  };

  const handleSaveConsultation = () => {
    if (
      newConsultation.name &&
      newConsultation.duration &&
      newConsultation.price
    ) {
      // Create new consultation with unique ID
      const newConsultationItem = {
        id: Date.now(), // Simple ID generation
        name: newConsultation.name,
        duration: newConsultation.duration,
        price: parseInt(newConsultation.price),
        description: newConsultation.description || 'Custom consultation type',
        features: ['Custom consultation', 'Professional medical advice'],
        isCustom: true,
      };

      // Add to consultations context
      addConsultation(newConsultationItem);

      // Reset form
      setNewConsultation({
        name: '',
        duration: '',
        price: '',
        description: '',
      });
      setShowCreateForm(false);

      console.log('Created new consultation:', newConsultationItem);
    }
  };

  const handleInputChange = (field, value) => {
    setNewConsultation((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Manage Consultation Types</h1>
        <p>Create and manage your consultation offerings for patients</p>
        <button
          className="create-consultation-btn"
          onClick={handleCreateConsultation}
        >
          + Create New Consultation Type
        </button>
      </div>

      <div className="services-grid">
        {(consultationTypes || []).map((service) => (
          <div
            key={service.id}
            className={`service-card ${service.popular ? 'popular' : ''}`}
          >
            {service.popular && (
              <div className="popular-badge">Most Popular</div>
            )}

            <div className="service-header">
              <h3>{service.name}</h3>
              <div className="service-duration">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"
                    fill="currentColor"
                  />
                </svg>
                <span>{service.duration}</span>
              </div>
            </div>

            <div className="service-price">
              <span className="currency">₹</span>
              <span className="amount">{service.price}</span>
            </div>

            <div className="service-description">
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Consultation Modal */}
      {showCreateForm && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <div className="modal-header">
              <h3>Create New Consultation Type</h3>
              <button
                className="close-modal"
                onClick={() => setShowCreateForm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="create-form">
                <div className="form-group">
                  <label htmlFor="consultation-name">Consultation Name</label>
                  <input
                    id="consultation-name"
                    type="text"
                    placeholder="e.g., Quick Consultation"
                    value={newConsultation.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="consultation-duration">Duration</label>
                  <input
                    id="consultation-duration"
                    type="text"
                    placeholder="e.g., 30 minutes"
                    value={newConsultation.duration}
                    onChange={(e) =>
                      handleInputChange('duration', e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="consultation-price">Price (₹)</label>
                  <input
                    id="consultation-price"
                    type="number"
                    placeholder="e.g., 500"
                    value={newConsultation.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="consultation-description">
                    Description (Optional)
                  </label>
                  <textarea
                    id="consultation-description"
                    placeholder="Brief description of this consultation type"
                    value={newConsultation.description}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    rows="3"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="confirm-book-btn"
                  onClick={handleSaveConsultation}
                  disabled={
                    !newConsultation.name ||
                    !newConsultation.duration ||
                    !newConsultation.price
                  }
                >
                  Create Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
