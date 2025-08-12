import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetBookingsQuery } from '../../store/slices/bookings.slice';
import { useGetAvailabilitySlotsQuery } from '../../store/slices/availability.slice';
import { fetchUserProfile } from '../../store/slices/auth.slice';
import { API_BASE_URL } from '../../store/api/api';
import { useConsultations } from '../../contexts/ConsultationContext';
import Loading from '../common/Loading';
import ConsultationList from '../common/ConsultationList';
import './dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    loading: authLoading,
  } = useSelector((state) => state.auth);

  const { consultations } = useConsultations();

  // Fetch user profile on component mount
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  // Fetch bookings data
  const { data: bookingsData, isLoading: bookingsLoading } =
    useGetBookingsQuery({
      status: 'all',
      limit: 10,
    });

  // Fetch availability slots
  const { data: availabilityData, isLoading: availabilityLoading } =
    useGetAvailabilitySlotsQuery({});

  const bookings = bookingsData || [];
  const availabilitySlots = availabilityData || [];

  // Calculate dashboard statistics
  const calculateStats = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todayBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.appointmentDate);
      return bookingDate >= startOfDay && bookingDate <= endOfDay;
    });

    const confirmedBookings = bookings.filter(
      (booking) => booking.status === 'confirmed',
    );

    const pendingBookings = bookings.filter(
      (booking) => booking.status === 'pending',
    );

    const completedBookings = bookings.filter(
      (booking) => booking.status === 'completed',
    );

    return {
      totalBookings: bookings.length,
      todayBookings: todayBookings.length,
      confirmedBookings: confirmedBookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      availableSlots: availabilitySlots.length,
    };
  };

  const stats = calculateStats();

  // Get recent bookings (last 5)
  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Get upcoming appointments
  const upcomingAppointments = bookings
    .filter((booking) => {
      const appointmentDate = new Date(booking.appointmentDate);
      return appointmentDate > new Date() && booking.status === 'confirmed';
    })
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'badge-success';
      case 'pending':
        return 'badge-warning';
      case 'completed':
        return 'badge-info';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  // Get profile picture URL - Fixed to use correct API base URL
  const getProfilePictureUrl = () => {
    // Debug log to see what's in user object
    console.log('🖼️ [DASHBOARD] User object:', user);
    console.log('🖼️ [DASHBOARD] PhotoUrl field:', user?.photoUrl);
    console.log('🖼️ [DASHBOARD] API Base URL:', API_BASE_URL);

    if (user?.photoUrl) {
      // If it's already a full URL (starts with http), use it directly
      if (user.photoUrl.startsWith('http')) {
        console.log('🖼️ [DASHBOARD] Using full URL:', user.photoUrl);
        return user.photoUrl;
      }

      // If it's a relative path, construct the full URL using API_BASE_URL
      // Remove leading slash if present to avoid double slashes
      const cleanPath = user.photoUrl.startsWith('/')
        ? user.photoUrl.substring(1)
        : user.photoUrl;
      const fullImageUrl = `${API_BASE_URL}${cleanPath}`;
      console.log('🖼️ [DASHBOARD] Constructed image URL:', fullImageUrl);
      return fullImageUrl;
    }

    // Fallback to placeholder
    console.log('🖼️ [DASHBOARD] No photoUrl found, using placeholder');
    return '/placeholder.png';
  };

  if (!isAuthenticated) {
    return <div>Please log in to view the dashboard.</div>;
  }

  if (bookingsLoading || availabilityLoading || authLoading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>
            Welcome back, Dr.{' '}
            {user?.display_name || user?.firstName || 'Doctor'}!
          </h1>
          <p className="welcome-subtitle">
            Here's what's happening with your practice today
          </p>
        </div>
        <div className="welcome-date">
          <span>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-success">
          <div className="stat-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

        <div className="stat-card stat-card-primary">
          <div className="stat-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.todayBookings}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.pendingBookings}</h3>
            <p>Pending Approval</p>
          </div>
        </div>
        {/* 
        <div className="stat-card stat-card-info">
          <div className="stat-icon">
            <i className="fas fa-calendar-plus"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.availableSlots}</h3>
            <p>Available Slots</p>
          </div>
        </div> */}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Upcoming Appointments */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Upcoming Appointments</h3>
            <span className="card-count">{upcomingAppointments.length}</span>
          </div>
          <div className="card-content">
            {upcomingAppointments.length > 0 ? (
              <div className="appointments-list">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="appointment-item">
                    <div className="appointment-time">
                      <span className="time">
                        {formatTime(appointment.appointmentDate)}
                      </span>
                      <span className="date">
                        {formatDate(appointment.appointmentDate)}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <h4>{appointment.patientName || 'Patient'}</h4>
                      <p>{appointment.service || 'General Consultation'}</p>
                    </div>
                    <div className="appointment-status">
                      <span
                        className={`status-badge ${getStatusBadgeClass(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-calendar-times"></i>
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Bookings</h3>
            <span className="card-count">{recentBookings.length}</span>
          </div>
          <div className="card-content">
            {recentBookings.length > 0 ? (
              <div className="bookings-list">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-info">
                      <h4>{booking.patientName || 'Patient'}</h4>
                      <p>
                        {formatDate(booking.appointmentDate)} at{' '}
                        {formatTime(booking.appointmentDate)}
                      </p>
                      <span className="booking-service">
                        {booking.service || 'General Consultation'}
                      </span>
                    </div>
                    <div className="booking-status">
                      <span
                        className={`status-badge ${getStatusBadgeClass(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-inbox"></i>
                <p>No recent bookings</p>
              </div>
            )}
          </div>
        </div>

        {/* Doctor Info Card */}
        <div className="dashboard-card doctor-profile-card">
          <div className="card-header">
            <h3>Profile Overview</h3>
          </div>
          <div className="card-content">
            <div className="doctor-info">
              <div className="doctor-avatar">
                <img
                  src={getProfilePictureUrl()}
                  alt="Doctor Avatar"
                  onError={(e) => {
                    console.log(
                      '🖼️ [DASHBOARD] Image failed to load, using placeholder',
                    );
                    console.log('🖼️ [DASHBOARD] Failed URL was:', e.target.src);
                    e.target.src = '/placeholder.png';
                  }}
                  onLoad={() => {
                    console.log('🖼️ [DASHBOARD] Image loaded successfully');
                  }}
                />
                <div className="avatar-status">
                  <i className="fas fa-circle"></i>
                </div>
              </div>
              <div className="doctor-details">
                <h4>
                  Dr.{' '}
                  {user?.display_name ||
                    `${user?.firstName} ${user?.lastName}` ||
                    'Doctor'}
                </h4>
                <p className="doctor-specialty">
                  {user?.title || user?.specialty || 'General Medicine'}
                </p>
                <div className="doctor-contact">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>{user?.email}</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>{user?.phone || 'Phone not provided'}</span>
                  </div>
                  {user?.address && (
                    <div className="contact-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{user.address}</span>
                    </div>
                  )}
                </div>
                <div className="doctor-consultations">
                  <ConsultationList
                    consultations={consultations}
                    maxItems={3}
                    showTitle={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
