import {
  createSlice,
  createAsyncThunk,
  current,
  createSelector,
} from '@reduxjs/toolkit';
import apiClient from '../api/api';
import { sendPasswordResetEmail } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  signInWithEmailAndPassword,
  auth,
  signInWithCustomToken,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
} from './../../utils/firebaseConfig';
import { APP_URL, actionCodeSettings } from './../../utils/const';
import { handleFirebaseError } from './../../utils/helpers';

/**
 // region REGISTER WITH CREDENTIALS
 */
export const authRegister = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.request({
        method: 'post',
        url: '/auth/register',
        data: payload,
      });

      if (response?.data?.statusCode === 409) {
        return response?.data?.data;
      }

      if (response?.data?.statusCode === 201) {
        if (response?.data?.data?.idToken) {
          const singInToken = await signInWithCustomToken(
            auth,
            response?.data?.data?.idToken,
          );

          if (singInToken?.user) {
            try {
              await sendEmailVerification(singInToken.user, {
                ...actionCodeSettings,
                url: actionCodeSettings.url + 'verify',
              });
            } catch (error) {}
            return {
              ...response?.data,
              data: singInToken?.user,
            };
          }
        }
      }

      return rejectWithValue({
        ...response?.data,
        data: null,
        statusCode: 500,
        success: false,
      });
    } catch (error) {
      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
          success: false,
        });
      }
    }
  },
);

// region LOGIN WITH EMAIL AND PASSWORD
export const authLogin = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload?.email,
        payload?.password,
      );
      const idToken = await userCredential.user.getIdToken(true);

      if (!userCredential?.user?.emailVerified) {
        return rejectWithValue({
          statusCode: 403,
          message: 'Your email is not verified.',
          error: {
            message: 'Please verify you email address.',
          },
        });
      }

      const response = await apiClient.request({
        method: 'post',
        url: '/auth/login',
        data: {
          token: idToken,
          role: payload?.role,
        },
      });

      if (response?.data?.statusCode === 200) {
        if (response?.data?.data?.idToken) {
          const singInToken = await signInWithCustomToken(
            auth,
            response?.data?.data?.idToken,
          );
          if (singInToken?.user) {
            const authUser = {
              ...singInToken?.user,
              auth: undefined,
              metadata: undefined,
              providerData: undefined,
              reloadUserInfo: undefined,
            };
            return { user: authUser, profile: response?.data?.data };
          }
        }
      }
    } catch (error) {
      const errorMessages = handleFirebaseError(error);
      if (errorMessages?.message) {
        return rejectWithValue({
          error: {
            code: errorMessages?.code,
            message: errorMessages?.errorMessage,
          },
          message: errorMessages?.message,
          data: null,
          statusCode: errorMessages?.code || 500,
        });
      }
      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      }
      return rejectWithValue({
        error: error,
        message: error?.message,
        data: null,
        statusCode: error?.code || 500,
      });
    }
  },
);

/**
 // region LOGIN WITH GOOGLE PROVIDER
 */
export const authGoogleSignIn = createAsyncThunk(
  'auth/google-signin',
  async (payload, { rejectWithValue }) => {
    try {
      // google
      const hasService = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      if (!hasService) {
        throw Error('service not available');
      }
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = await GoogleAuthProvider.credential(
        userInfo?.idToken,
      );
      // firebase
      const userCredential = await signInWithCredential(auth, googleCredential);
      const firebaseToken = await userCredential.user.getIdToken();

      const response = await apiClient.request({
        method: 'post',
        url: '/auth/login',
        data: {
          token: firebaseToken,
          role: payload?.role,
          provider: 'google',
        },
      });

      if (response?.data?.statusCode === 200) {
        if (response?.data?.data?.idToken) {
          const singInToken = await signInWithCustomToken(
            auth,
            response?.data?.data?.idToken,
          );
          if (singInToken?.user) {
            return { user: singInToken?.user, profile: response?.data?.data };
          }
        }
      }
    } catch (error) {
      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

// region AUTH CHECK
export const authChecker = createAsyncThunk(
  'auth/checker',
  async (_, { rejectWithValue }) => {
    const state = thunkAPI.getState();
    const accessToken =
      state?.authSlice?.user?.accessToken ??
      state?.authSlice?.user?.stsTokenManager?.accessToken;
    try {
      const response = await apiClient.request({
        method: 'get',
        url: '/user/auth-check',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response?.data?.data?.statusCode === 500) {
        return rejectWithValue(response?.data?.data);
      }

      return response;
    } catch (error) {
      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

/**
 // region SEND VERIFY EMAIL
 */
export const sendVerifyEmail = createAsyncThunk(
  'auth/sendVerifyEmail',
  async (payload, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload?.email,
        payload?.password,
      );

      if (userCredential?.user?.emailVerified) {
        return {
          data: userCredential?.user,
          statusCode: 200,
          error: null,
          message: 'Email already verified. Please login!',
        };
      }

      if (userCredential.user) {
        await sendEmailVerification(userCredential.user, {
          ...actionCodeSettings,
          url: actionCodeSettings.url + '/verify',
        });
        return {
          data: null,
          statusCode: 200,
          error: null,
          message: 'Your email verification code successfully send.',
        };
      }

      return rejectWithValue({
        error: {
          message: 'Something was wrong! Please try again',
        },
        message: 'Could not send verification email.',
        data: null,
        statusCode: 500,
      });
    } catch (error) {
      const errorMessages = handleFirebaseError(error);
      if (errorMessages?.message) {
        return rejectWithValue({
          error: {
            code: errorMessages?.code,
            message: errorMessages?.errorMessage,
          },
          message: errorMessages?.message,
          data: null,
          statusCode: errorMessages?.code || 500,
        });
      }

      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      }

      return rejectWithValue({
        error: error,
        message: error?.message,
        data: null,
        statusCode: error?.code || 500,
      });
    }
  },
);

// region VERIFY EMAIL
export const verifyEmail = createAsyncThunk(
  'user/verifyEmail',
  async (stateCode, { rejectWithValue }) => {
    try {
      const response = await apiClient.request({
        method: 'post',
        url: '/auth/verify-email',
        data: { state_code: stateCode },
      });

      if (response?.data?.statusCode === 200) {
        const loginResponse = await apiClient.request({
          method: 'post',
          url: 'api/auth/login',
          data: {
            token: stateCode,
            role: 'doctor',
          },
        });

        if (
          loginResponse?.data?.statusCode === 200 &&
          loginResponse?.data?.data?.idToken
        ) {
          const singInToken = await signInWithCustomToken(
            auth,
            loginResponse?.data?.data?.idToken,
          );
          if (singInToken?.user) {
            return singInToken?.user;
          }
        }
      }

      return response?.data;
    } catch (error) {
      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

// region LOGOUT
export const authLogout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken =
      state?.authSlice?.user?.accessToken ??
      state?.authSlice?.user?.stsTokenManager?.accessToken;
    try {
      if (accessToken) {
        const response = await apiClient.request({
          method: 'get',
          url: '/user/logout',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        try {
          await auth.signOut();
          await signOut(auth);
          await GoogleSignin.signOut();
        } catch (err) {}
        return response.data;
      }
    } catch (error) {
      if (error?.data || error?.statusCode) {
        return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

// region PROFILE
export const fetchUserProfile = createAsyncThunk(
  'api/profile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken =
      state?.authSlice?.user?.accessToken ??
      state?.authSlice?.user?.stsTokenManager?.accessToken;
    try {
      if (accessToken) {
        const response = await apiClient.request({
          method: 'get',
          url: '/profile',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return response.data;
      } else {
        throw new Error('Access token not found.');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      if (error?.data || error?.statusCode) {
        return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

// region UPDATE PROFILE
export const updateUserProfile = createAsyncThunk(
  'api/profileUpdate',
  async (payload, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken =
      state?.authSlice?.user?.accessToken ??
      state?.authSlice?.user?.stsTokenManager?.accessToken;
    try {
      if (accessToken) {
        const response = await apiClient.request({
          method: 'put',
          url: '/profile',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return response.data;
      } else {
        throw new Error('Access token not found.');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      if (error?.data || error?.statusCode) {
        return thunkAPI.rejectWithValue(error);
      } else {
        return thunkAPI.rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

// region RESET PASSWORD
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ newPassword }, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      await user.updatePassword(newPassword); // Assuming you are using Firebase Auth
      return { success: true };
    } catch (error) {
      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

// region SEND RESET EMAIL
export const sendPasswordResetEmailRequest = createAsyncThunk(
  'auth/sendPasswordResetEmail',
  async ({ email }, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        ...actionCodeSettings,
        url: actionCodeSettings.url + '/login',
      });
      return { message: 'Password reset email sent successfully' };
    } catch (error) {
      const errorMessages = handleFirebaseError(error);
      if (errorMessages?.message) {
        return rejectWithValue({
          error: {
            code: errorMessages?.code,
            message: errorMessages?.errorMessage,
          },
          message: errorMessages?.message,
          data: null,
          statusCode: errorMessages?.code || 500,
        });
      }
      if (error?.data || error?.statusCode) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue({
          error: error,
          message: error?.message,
          data: null,
          statusCode: error?.code || 500,
        });
      }
    }
  },
);

// Initial state
const initialState = {
  loading: false,
  providerLoading: false,
  user: null,
  profile: {},
  error: null,
  isVerifyNeeded: false,
  isAuthenticated: false,
  booking: {},
  appRefresh: false,
};

// region Crate Slice
export const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout(state, action) {
      state.user = null;
      state.profile = {};
      state.isAuthenticated = false;
    },
    refreshAuth(state, action) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    resetAuthError(state, action) {
      state.loading = false;
      state.error = null;
    },
    setBooking(state, action) {
      if (action?.payload?.reset) {
        state.booking = {};
      } else {
        state.booking = {
          ...state.booking,
          ...action?.payload,
        };
      }
    },
    refreshApp(state, action) {
      state.appRefresh = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // region AUTH CHECK ACTION
      .addCase(authChecker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authChecker.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action?.payload?.data?.statusCode === 500) {
          state.isAuthenticated = false;
          state.user = null;
        } else {
          if (action?.payload?.status === 200) {
            state.isAuthenticated = true;
          } else {
            state.isAuthenticated = false;
            state.user = null;
          }
        }
      })
      .addCase(authChecker.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      // region PROFILE ACTION
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;

        if (action?.payload?.statusCode === 200) {
          state.profile = {
            ...state.profile,
            ...action?.payload?.data,
          };
          state.error = null;
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // region SIGNUP ACTION
      .addCase(authRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload?.error && action?.payload?.statusCode === 409) {
          state.error = {
            error: {
              message: 'Please try with using another email address',
            },
            message: 'Email already exists.',
          };
          state.isAuthenticated = false;
          state.user = null;
          return state;
        }

        if (action?.payload) {
          state.error = null;
          state.user = action?.payload?.data;
          state.isAuthenticated = true;
          state.isVerifyNeeded = true;
        }
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isVerifyNeeded = false;
        state.loading = false;
        const serverErrorObj = action?.payload;

        let message;
        let errorMessage;
        const code =
          serverErrorObj?.error?.code || serverErrorObj?.error?.statusCode;
        if (code === 'auth/invalid-credential') {
          message = 'Invalid Credentials.';
          errorMessage = 'Please try again with valid credentials';
        } else if (code === 'auth/user-not-found') {
          message = 'User not found.';
          errorMessage = 'Please sign up with new account';
        } else if (code === 'auth/too-many-requests') {
          message = 'Too many requests.';
          errorMessage =
            'Your account is suspended. Please reset your password.';
        } else if (code === 'auth/network-request-failed') {
          message = 'Network request failed.';
          errorMessage = 'Please check your internet connection.';
        } else if (
          serverErrorObj?.error &&
          serverErrorObj?.statusCode === 409
        ) {
          message = 'Email already exists.';
          errorMessage = 'Please try with using another email address';
        } else {
          message = 'Something went wrong';
        }

        state.error = {
          ...serverErrorObj,
          error: {
            message: errorMessage,
          },
          message,
        };
      })
      // region GOOGLE ACTION
      .addCase(authGoogleSignIn.pending, (state) => {
        state.providerLoading = true;
        state.error = null;
      })
      .addCase(authGoogleSignIn.fulfilled, (state, action) => {
        state.providerLoading = false;

        if (action?.payload) {
          state.user = action?.payload?.user;
          state.profile = action?.payload?.profile;
          state.isAuthenticated = true;
          state.error = null;
        }
      })
      .addCase(authGoogleSignIn.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.providerLoading = false;

        if (action?.type === 'auth/google-signin/rejected') {
          state.error = action.payload;
        } else {
          state.error = action.payload;
        }
      })
      // region LOGIN ACTION
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action?.payload) {
          state.user = action?.payload?.user;
          state.profile = action?.payload?.profile;
          state.isAuthenticated = true;
          state.error = null;
        }
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        const serverErrorObj = action?.payload;
        const code =
          serverErrorObj?.error?.code ||
          serverErrorObj?.statusCode ||
          serverErrorObj?.error?.statusCode;
        if (code === 403) {
          // email not verified
          state.error = serverErrorObj;
        } else {
          const errorMessages = handleFirebaseError(serverErrorObj);
          if (errorMessages?.message) {
            state.error = {
              ...serverErrorObj,
              error: {
                code: errorMessages?.code,
                message: errorMessages?.message,
              },
              message: errorMessages?.message,
            };
          } else {
            state.error = serverErrorObj;
          }
        }
      })
      // region LOGOUT ACTION
      .addCase(authLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.profile = {};
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // region PROFILE UPDATE ACTION
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const actionData = action?.payload?.data;
        state.loading = false;
        state.profile = {
          ...state.profile,
          ...actionData,
        };
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // region RESET PASS ACTION
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // region SEND VERIFY EMAIL ACTION
      .addCase(sendVerifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendVerifyEmail.rejected, (state, action) => {
        state.loading = false;
        const serverErrorObj = action?.payload;
        const errorMessages = handleFirebaseError(error);
        if (errorMessages?.message) {
          state.error = {
            ...serverErrorObj,
            error: {
              code: errorMessages?.code,
              message: errorMessages?.message,
            },
            message: errorMessages?.message,
          };
        } else {
          const message = 'Something went wrong';
          const errorMessage = 'Pleas try again later.';
          state.error = {
            ...serverErrorObj,
            error: {
              message: errorMessage,
            },
            message,
          };
        }
      })
      // region VERIFY EMAIL ACTION
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action?.payload && action?.payload?.accessToken) {
          const currentData = current(state.user);
          state.user = {
            ...currentData,
            ...action?.payload,
          };
          state.isAuthenticated = true;
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const authState = (state) => state.authSlice;
export const authSelector = createSelector(authState, (auth) => ({ ...auth }));
export const userSelector = createSelector(authState, (auth) => auth.user);
export const profileSelector = createSelector(
  authState,
  (auth) => auth.profile,
);
export const isAuthenticatedSelector = createSelector(authState, (auth) => {
  const hasAccessToken = !!(
    auth?.user?.accessToken || auth?.user?.stsTokenManager?.accessToken
  );
  return !!(hasAccessToken && auth?.isAuthenticated);
});
export const isAccessTokenExpiredSelector = createSelector(
  userSelector,
  (user) => {
    let isExpired = false;
    const expirationTime =
      user?.expirationTime || user?.stsTokenManager?.expirationTime;
    const currentTime = new Date().getTime() + 1000 * 60 * 5;
    if (!expirationTime || currentTime >= expirationTime) {
      return true;
    }
    return isExpired;
  },
);
export const bookingSelector = createSelector(
  authState,
  (auth) => auth.booking,
);
export const appRefreshSelector = createSelector(
  authState,
  (auth) => auth.appRefresh,
);

export const { logout, refreshAuth, resetAuthError, setBooking, refreshApp } =
  AuthSlice.actions;

export const onAppRefresh = (dispatch) => {
  dispatch(refreshApp(true));
  const timeOutID = setTimeout(() => {
    dispatch(refreshApp(false));
    clearTimeout(timeOutID);
  }, 2000);
};

// Export actions and reducer
export default AuthSlice.reducer;
