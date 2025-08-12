import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaEdit } from 'react-icons/fa'; // Import Font Awesome edit icon
import './Profile.css';
import {
  fetchUserProfile,
  updateUserProfile,
} from '../../store/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import { useGetAllServicesQuery } from './../../store/slices';
import { useConsultations } from '../../contexts/ConsultationContext';
import ConsultationList from '../common/ConsultationList';
// import MultipleSelect from './MultipleSelect';

const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formFields, setFormFields] = useState({
    display_name: '',
    title: '',
    hospital_name: '',
    expertiseList: [],
    experience: '',
    bio: '',
    photoUrl: '',
    phone: '',
    gender: '',
    // services: [],
    // servicesIds: [],
    location: {
      address: '',
      city: '',
      state: '',
      country: '',
    },
  });
  const [photoPreviewUrl, setPreviewUrl] = useState('');
  const { user, error, loading } = useSelector((state) => state?.auth);
  const { data: servicesData, isLoading } = useGetAllServicesQuery({});
  const { consultations } = useConsultations();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && error) {
      toast(error.message);
    }

    if (user && !error && !loading) {
      setProfileData(user);
      setFormFields({
        display_name: user.display_name,
        title: user.title,
        hospital_name: user.hospital_name,
        expertiseList: user.expertiseList,
        experience: user.experience,
        bio: user.bio,
        photoUrl: '',
        phone: user.phone,
        gender: user.gender,
        services: servicesData,
        location: {
          address: user.location?.address,
          city: user.location?.city,
          state: user.location?.state,
          country: user.location?.country,
        },
      });
      setPreviewUrl(user?.photoUrl);
    }

    if (servicesData) {
      setFormFields((state) => ({ ...state, services: servicesData }));
    }
  }, [user, error, loading, servicesData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'expertiseList') {
      setFormFields({
        ...formFields,
        expertiseList: [...formFields.expertiseList, value],
      });
    } else if (['address', 'state', 'city', 'country'].includes(name)) {
      setFormFields({
        ...formFields,
        location: {
          ...formFields.location,
          [name]: value,
        },
      });
    } else if (name === 'services') {
      setFormFields({
        ...formFields,
        servicesIds: [...value],
      });
    } else {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }
  };

  // TO HANDLE FILES ON CHANGE..
  const handleFileChange = (e) => {
    setFormFields((prevData) => ({
      ...prevData,
      photoUrl: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('display_name', String(formFields.display_name));
    formData.append('title', String(formFields.title));
    formData.append('phone', String(formFields.phone));
    formData.append('gender', String(formFields.gender));
    formData.append('bio', String(formFields.bio));
    formData.append('experience', Number(formFields.experience));
    formData.append('hospital_name', String(formFields.hospital_name));

    if (formFields.location) {
      formData.append('location', JSON.stringify(formFields.location));
    }

    formFields?.servicesIds?.forEach((item) =>
      formData.append('services[]', item),
    );

    formFields?.expertiseList?.forEach((item) =>
      formData.append('expertiseList[]', item),
    );

    if (formFields.photoUrl) {
      formData.append('file', formFields.photoUrl);
    }

    try {
      dispatch(updateUserProfile(formData));

      setIsEditing(false);
    } catch (error) {
      console.error('Updating profile failed:', error);
      if (error?.statusCode === 400) {
        toast.error(error.message);
      } else {
        toast.error('An error occurred while updating your profile.');
      }
    }
  };

  const addTag = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      // setTags([...tags, inputValue.trim()]);
      setFormFields({
        ...formFields,
        expertiseList: formFields.expertiseList?.length
          ? [...formFields.expertiseList, inputValue.trim()]
          : [inputValue.trim()],
      });
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove) => {
    // setTags(tags.filter((_, index) => index !== indexToRemove));
    setFormFields({
      ...formFields,
      expertiseList: formFields.expertiseList.filter(
        (_, index) => index !== indexToRemove,
      ),
    });
  };

  if (loading || isLoading) {
    return (
      <div className="flex text-center justify-center">
        <ScaleLoader size={150} color={'#18A0FB'} loading={loading} />
      </div>
    );
  }

  return (
    <div id="profile">
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center mt-4 center">
          <div className="col-md-10">
            <div className="card shadow-sm">
              <div className="card-body">
                {isEditing ? (
                  <form
                    onSubmit={handleFormSubmit}
                    encType="multipart/form-data"
                    className="profile-form"
                  >
                    <div className="profile-image-edit-section">
                      <div className="current-profile-image">
                        <img
                          src={photoPreviewUrl || '/placeholder.png'}
                          alt="Current profile"
                          className="edit-profile-image"
                        />
                        <div className="image-edit-overlay">
                          <label htmlFor="file" className="image-edit-btn">
                            <FaEdit /> Change Photo
                          </label>
                          <input
                            type="file"
                            className="hidden-file-input"
                            id="file"
                            name="file"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="display_name">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="display_name"
                          name="display_name"
                          value={formFields?.display_name || ''}
                          onChange={handleChange}
                          placeholder="Enter name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="title">Designation/Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          value={formFields?.title || ''}
                          onChange={handleChange}
                          placeholder="Enter title"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formFields?.phone || ''}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                          className="form-control"
                          id="gender"
                          name="gender"
                          value={formFields?.gender || ''}
                          onChange={handleChange}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        className="form-control"
                        id="bio"
                        name="bio"
                        value={formFields?.bio || ''}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                      ></textarea>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="experience">Experience (Years)</label>
                        <input
                          type="text"
                          className="form-control"
                          id="experience"
                          name="experience"
                          value={formFields?.experience || ''}
                          onChange={handleChange}
                          placeholder="Enter experience"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="hospital_name">
                          Hospital/Clinic Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="hospital_name"
                          name="hospital_name"
                          value={formFields?.hospital_name || ''}
                          onChange={handleChange}
                          placeholder="Enter hospital or clinic name"
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="expertiseList">Specialty/Expertise</label>
                      <div className="tags-input-wrapper">
                        <div className="tags">
                          {Array.isArray(formFields?.expertiseList) &&
                            formFields.expertiseList.map((tag, index) => (
                              <div key={index} className="tag">
                                {tag}
                                <span
                                  className="remove-tag"
                                  onClick={() => removeTag(index)}
                                >
                                  x
                                </span>
                              </div>
                            ))}
                        </div>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={addTag}
                          placeholder="Press enter to add tags"
                          className="tagsInput"
                        />
                      </div>
                    </div>

                    {/* <div className="form-group full-width">
                      <MultipleSelect
                        data={servicesData || []}
                        formFields={{ services: [] }}
                        handleChange={handleChange}
                      />
                    </div> */}

                    <div className="form-section">
                      <h5 className="section-title">Address Information</h5>

                      <div className="form-group full-width">
                        <label htmlFor="location_address">Street Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="location_address"
                          name="address"
                          value={formFields?.location?.address || ''}
                          onChange={handleChange}
                          placeholder="Enter Address"
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="location_city">City</label>
                          <input
                            type="text"
                            className="form-control"
                            id="location_city"
                            name="city"
                            value={formFields?.location?.city || ''}
                            onChange={handleChange}
                            placeholder="Enter city"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="location_state">State</label>
                          <input
                            type="text"
                            className="form-control"
                            id="location_state"
                            name="state"
                            value={formFields?.location?.state || ''}
                            onChange={handleChange}
                            placeholder="Enter state"
                          />
                        </div>
                      </div>

                      <div className="form-group full-width">
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          id="country"
                          name="country"
                          value={formFields?.location?.country || ''}
                          onChange={handleChange}
                          placeholder="Enter country"
                        />
                      </div>
                    </div>

                    <div className="form-group divided">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-secondary cancel"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary save">
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-horizontal-layout">
                    <div className="profile-image-section">
                      <img
                        src={photoPreviewUrl || '/placeholder.png'}
                        alt="Doctor's profile"
                        className="profile-image"
                      />
                    </div>
                    <div className="profile-info-section">
                      <div className="profile-header">
                        <h2 className="profile-name">
                          {profileData?.display_name}
                        </h2>
                        <h4 className="profile-title">{profileData?.title}</h4>
                        {profileData?.hospital_name && (
                          <h5 className="profile-hospital">
                            {profileData?.hospital_name}
                          </h5>
                        )}
                        <div className="profile-experience">
                          <span className="experience-badge">
                            {profileData?.experience}+ years experience
                          </span>
                        </div>
                      </div>

                      <div className="profile-bio">
                        <p>{profileData?.bio}</p>
                      </div>

                      <div className="profile-expertise">
                        <h5>Specialties</h5>
                        <div className="expertise-tags">
                          {profileData?.expertiseList &&
                          profileData.expertiseList?.length ? (
                            profileData.expertiseList?.map(
                              (speciality, index) => (
                                <span className="expertise-tag" key={index}>
                                  {speciality}
                                </span>
                              ),
                            )
                          ) : (
                            <span className="no-data">
                              No specialties listed
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="profile-consultations">
                        <ConsultationList
                          consultations={consultations}
                          showTitle={true}
                        />
                      </div>

                      <div className="profile-actions">
                        <button
                          onClick={handleEditClick}
                          className="btn btn-primary edit-btn"
                        >
                          <FaEdit /> Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
