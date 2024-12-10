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
import MultipleSelect from './MultipleSelect';

const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formFields, setFormFields] = useState({
    display_name: '',
    title: '',
    expertiseList: [],
    experience: '',
    bio: '',
    photoUrl: '',
    phone: '',
    gender: '',
    services: [],
    servicesIds: [],
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
          <div className="col-md-7">
            <div className="card shadow-sm">
              <img
                src={photoPreviewUrl || '/placeholder.png'}
                alt="Doctor's profile"
                className="rounded-circle mx-auto d-block mt-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                {isEditing ? (
                  <form
                    onSubmit={handleFormSubmit}
                    encType="multipart/form-data"
                    className="profile-form"
                  >
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

                    <div className="form-group">
                      <label htmlFor="experience">Experience</label>
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

                    <div className="form-group">
                      <MultipleSelect
                        data={servicesData || []}
                        formFields={{ services: [] }}
                        handleChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Address</label>
                      {/* Render Address fields if AddressDto is available */}
                      {/* Assuming AddressDto has fields like street, city, state, country */}
                      <input
                        type="text"
                        className="form-control"
                        id="location_address"
                        name="address"
                        value={formFields?.location?.address || ''}
                        onChange={handleChange}
                        placeholder="Enter Address"
                      />

                      <label htmlFor="location">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location_city"
                        name="city"
                        value={formFields?.location?.city || ''}
                        onChange={handleChange}
                        placeholder="Enter city"
                      />

                      <label htmlFor="location">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location_state"
                        name="state"
                        value={formFields?.location?.state || ''}
                        onChange={handleChange}
                        placeholder="Enter state"
                      />

                      <label htmlFor="location">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="location_country"
                        value={formFields?.location?.country || ''}
                        onChange={handleChange}
                        placeholder="Enter country"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="file">Profile Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                      />
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
                  <div className="card-body text-center">
                    <h3 className="card-title ">{profileData?.display_name}</h3>
                    <h5 className="card-title ">{profileData?.title}</h5>
                    <h4>Expertise </h4>
                    <p className="card-subtitle mb-2 text-muted  head-experties">
                      {profileData?.expertiseList &&
                      profileData.expertiseList?.length ? (
                        profileData.expertiseList?.map((speciality, index) => (
                          <p className="experties" key={index}>
                            {speciality}
                          </p>
                        ))
                      ) : (
                        <p>No Expertise</p>
                      )}
                    </p>
                    <p className="card-text">
                      <span className="text-muted">Experience:</span>{' '}
                      {profileData?.experience}+ years
                    </p>

                    <h4>Services </h4>
                    <p className="card-subtitle mb-2 text-muted  head-experties">
                      {profileData?.services && profileData.services?.length ? (
                        profileData.services?.map((service, index) => (
                          <p className="experties" key={index}>
                            {service.name}
                          </p>
                        ))
                      ) : (
                        <p>No Expertise</p>
                      )}
                    </p>

                    <p className="card-text">{profileData?.bio}</p>
                    <button
                      onClick={handleEditClick}
                      className="btn btn-link text-secondary"
                    >
                      <FaEdit /> Edit
                    </button>
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
