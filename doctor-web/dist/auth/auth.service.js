"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../firebase/firebase.service");
const admin = __importStar(require("firebase-admin"));
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async verifyProviderToken(token, type) {
        console.log('🔐 [AUTH SERVICE] Starting token verification:', {
            hasToken: !!token,
            tokenLength: token?.length,
            type,
        });
        try {
            const providerUser = await this.firebaseService
                .getAuth()
                .verifyIdToken(token);
            console.log('✅ [AUTH SERVICE] Token verified successfully:', {
                uid: providerUser.uid,
                email: providerUser.email,
                emailVerified: providerUser.email_verified,
                name: providerUser.name,
            });
            if (!providerUser) {
                console.log('❌ [AUTH SERVICE] No provider user returned from token verification');
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Invalid token',
                    data: null,
                    error: {
                        code: common_1.HttpStatus.UNAUTHORIZED,
                        message: 'Invalid token',
                    },
                };
            }
            if (type === 'google') {
                console.log('🔍 [AUTH SERVICE] Processing Google provider user data');
                const googleUser = {
                    uid: providerUser.uid || providerUser.user_id,
                    email: providerUser.email,
                    displayName: providerUser.name || '',
                    photoURL: providerUser.picture || '',
                    emailVerified: providerUser.email_verified,
                    role: providerUser?.role || '',
                };
                console.log('✅ [AUTH SERVICE] Google user object created:', googleUser);
                return googleUser;
            }
            if (type === 'apple') {
                console.log('🍎 [AUTH SERVICE] Processing Apple provider user data');
                return providerUser;
            }
            console.log('📧 [AUTH SERVICE] Processing email/password login user data');
            return providerUser;
        }
        catch (error) {
            console.log('💥 [AUTH SERVICE] Token verification failed:', {
                error: error?.message,
                code: error?.code,
                type,
            });
            throw error;
        }
    }
    async generateToken(uid, role) {
        return await this.firebaseService.getAuth().createCustomToken(uid, {
            role,
        });
    }
    roleChecker(role) {
        if (role !== 'doctor' && role !== 'customer' && role !== 'admin') {
            return false;
        }
        return true;
    }
    async generateUniqueUserName(displayName) {
        let userName = this.generateUserName(displayName);
        let isUnique = false;
        let attempt = 1;
        while (!isUnique) {
            const userDoc = await this.firebaseService
                .getFireStore()
                .collection('profiles')
                .doc(userName)
                .get();
            if (!userDoc.exists) {
                isUnique = true;
                return userName;
            }
            userName = `${this.generateUserName(displayName)}${attempt}`;
            attempt++;
        }
        throw new Error('Unable to generate a unique username');
    }
    generateUserName(displayName) {
        return displayName
            .replace(/[^a-zA-Z0-9]/g, '')
            .toLowerCase()
            .slice(0, 20);
    }
    async register({ name, email, password, role = 'customer', token, provider = false, }) {
        try {
            let userRecord;
            const validRole = this.roleChecker(role);
            if (validRole === false) {
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Invalid Role',
                    data: null,
                    error: {
                        code: common_1.HttpStatus.UNAUTHORIZED,
                        message: 'Invalid Role',
                    },
                };
            }
            if (token) {
                userRecord = await this.verifyProviderToken(token, provider);
            }
            if (!provider) {
                userRecord = await this.firebaseService.getAuth().createUser({
                    email,
                    password: password,
                    displayName: name,
                });
            }
            const uniqueUserName = await this.generateUniqueUserName(!provider ? name : userRecord.displayName);
            const userId = String(userRecord?.uid || (0, uuid_1.v7)());
            await this.firebaseService
                .getFirestore()
                .collection('profiles')
                .doc(userId)
                .set({
                uid: userId,
                display_name: !provider ? name : userRecord.displayName,
                user_name: uniqueUserName,
                email: !provider ? email : userRecord.email,
                photoUrl: !provider ? '' : userRecord.photoURL,
                role: role,
                isVerified: userRecord.emailVerified,
                bio: '',
                phone: '',
                title: '',
                gender: '',
                experience: 0,
                expertiseList: [],
                availability: [],
                availabilitySlots: JSON.stringify([]),
                ratings: [],
                star_rating: 0,
                services: [],
                location: {
                    address: '',
                    city: '',
                    state: '',
                    country: '',
                },
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            }, { merge: true });
            const idToken = await this.generateToken(userRecord.uid, role);
            return {
                message: 'User registered successfully!',
                statusCode: common_1.HttpStatus.CREATED,
                data: {
                    userId: userId,
                    email: userRecord.email,
                    name: userRecord.displayName,
                    emailVerified: userRecord.emailVerified,
                    photoUrl: userRecord.photoURL,
                    creationTime: userRecord.metadata?.creationTime,
                    lastSignInTime: userRecord.metadata?.lastSignInTime,
                    lastRefreshTime: userRecord.metadata?.lastRefreshTime,
                    idToken,
                },
            };
        }
        catch (error) {
            const firebaseError = error;
            if (firebaseError.code) {
                switch (firebaseError.code) {
                    case 'auth/email-already-exists':
                        return {
                            statusCode: common_1.HttpStatus.CONFLICT,
                            message: 'Email already registered',
                            data: null,
                            error: {
                                code: common_1.HttpStatus.CONFLICT,
                                message: 'This email address is already registered. Please try logging in instead or use a different email address.',
                            },
                        };
                    case 'auth/weak-password':
                        return {
                            statusCode: common_1.HttpStatus.BAD_REQUEST,
                            message: 'Password is too weak',
                            data: null,
                            error: {
                                code: common_1.HttpStatus.BAD_REQUEST,
                                message: 'Password is too weak. Please choose a password with at least 6 characters.',
                            },
                        };
                    default:
                        return {
                            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                            message: 'Registration failed',
                            data: null,
                            error: {
                                code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                                message: 'Registration failed',
                            },
                        };
                }
            }
            else {
                return {
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'An unexpected error occurred',
                    data: null,
                    error: {
                        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An unexpected error occurred',
                    },
                };
            }
        }
    }
    async login({ token, role = 'customer', provider = false, }) {
        console.log('🚀 [AUTH SERVICE] Login attempt started');
        console.log('📋 [AUTH SERVICE] Login payload:', {
            hasToken: !!token,
            tokenLength: token?.length,
            role,
            provider,
        });
        try {
            let userRecord;
            const validRole = this.roleChecker(role);
            console.log('✅ [AUTH SERVICE] Role validation:', { role, validRole });
            if (validRole === false) {
                console.log('❌ [AUTH SERVICE] Invalid role detected:', role);
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Invalid Role',
                    data: null,
                    error: {
                        code: common_1.HttpStatus.UNAUTHORIZED,
                        message: 'Invalid Role',
                    },
                };
            }
            if (token && provider) {
                console.log('🔐 [AUTH SERVICE] Provider authentication flow started');
                console.log('🔍 [AUTH SERVICE] Verifying provider token...');
                userRecord = await this.verifyProviderToken(token, provider);
                console.log('✅ [AUTH SERVICE] Provider token verified:', {
                    uid: userRecord.uid,
                    email: userRecord.email,
                    displayName: userRecord.displayName,
                });
                console.log('👤 [AUTH SERVICE] Checking if user exists in Firebase Auth...');
                const authUser = await this.firebaseService
                    .getAuth()
                    .getUser(userRecord.uid);
                console.log('✅ [AUTH SERVICE] Firebase Auth user found:', {
                    uid: authUser.uid,
                    email: authUser.email,
                });
                console.log('🗄️ [AUTH SERVICE] Checking if user profile exists in Firestore...');
                const dbUser = await this.firebaseService
                    .getFirestore()
                    .collection('profiles')
                    .doc(userRecord.uid)
                    .get();
                console.log('📊 [AUTH SERVICE] Firestore profile check:', {
                    exists: dbUser.exists,
                    uid: userRecord.uid,
                });
                if (authUser && dbUser.exists === false) {
                    console.log('📝 [AUTH SERVICE] User not found in Firestore, auto-registering...');
                    const registerResult = await this.register({
                        name: userRecord.displayName,
                        email: userRecord.email,
                        password: '',
                        token: token,
                        role: role,
                        provider: provider,
                    });
                    console.log('✅ [AUTH SERVICE] Auto-registration result:', {
                        statusCode: registerResult.statusCode,
                        message: registerResult.message,
                    });
                }
                console.log('🔄 [AUTH SERVICE] Re-fetching user record after registration...');
                userRecord = await this.firebaseService
                    .getAuth()
                    .getUser(userRecord.uid);
                console.log('✅ [AUTH SERVICE] User record re-fetched successfully');
            }
            else {
                const decodedToken = await this.verifyProviderToken(token, false);
                if (typeof decodedToken === 'object' && 'uid' in decodedToken) {
                    const user = await this.firebaseService
                        .getAuth()
                        .getUser(decodedToken.uid);
                    if (!user) {
                        return {
                            statusCode: common_1.HttpStatus.UNAUTHORIZED,
                            message: 'Invalid credentials',
                            data: null,
                            error: {
                                code: common_1.HttpStatus.UNAUTHORIZED,
                                message: 'Invalid credentials',
                            },
                        };
                    }
                    userRecord = user;
                }
                else {
                    return {
                        statusCode: common_1.HttpStatus.UNAUTHORIZED,
                        message: 'Invalid token',
                        data: null,
                        error: {
                            code: common_1.HttpStatus.UNAUTHORIZED,
                            message: 'Invalid token',
                        },
                    };
                }
            }
            console.log('🎫 [AUTH SERVICE] Generating custom token for user...');
            const idToken = await this.generateToken(userRecord.uid, role);
            console.log('✅ [AUTH SERVICE] Custom token generated successfully');
            console.log('🔍 [AUTH SERVICE] Fetching user profile for role verification...');
            const userProfile = (await this.firebaseService
                .getFireStore()
                .collection(this.firebaseService.collections.profiles)
                .doc(userRecord.uid)
                .get()).data();
            console.log('📋 [AUTH SERVICE] User profile data:', {
                profileExists: !!userProfile,
                profileRole: userProfile?.role,
                requestedRole: role,
                email: userProfile?.email,
            });
            if (userProfile?.role !== role) {
                console.log('❌ [AUTH SERVICE] Role mismatch detected:', {
                    profileRole: userProfile?.role,
                    requestedRole: role,
                });
                const errorMessage = `This email is already registered as a ${userProfile?.role}. Please login using the ${userProfile?.role} portal or contact support to change your role.`;
                return {
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: errorMessage,
                    data: {
                        existingRole: userProfile?.role,
                        requestedRole: role,
                        email: userProfile?.email,
                        suggestion: `Try logging in as a ${userProfile?.role} instead`,
                    },
                    error: {
                        code: common_1.HttpStatus.CONFLICT,
                        message: errorMessage,
                        extra: { type: 'ROLE_MISMATCH' },
                    },
                };
            }
            console.log('🎉 [AUTH SERVICE] Login successful! Returning user data...');
            return {
                message: 'User logged in successfully',
                statusCode: common_1.HttpStatus.OK,
                data: {
                    ...userProfile,
                    userId: userRecord.uid,
                    email: userRecord.email,
                    emailVerified: userRecord.emailVerified,
                    idToken,
                },
            };
        }
        catch (error) {
            console.log('💥 [AUTH SERVICE] Login error caught:', error);
            console.log('🔍 [AUTH SERVICE] Error details:', {
                message: error?.message,
                code: error?.code,
                name: error?.name,
                stack: error?.stack?.substring(0, 200),
            });
            const firebaseError = error;
            if (firebaseError.code === 'auth/user-not-found') {
                console.log('❌ [AUTH SERVICE] User not found error');
                return {
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: 'Invalid credentials',
                    data: null,
                    error: {
                        code: common_1.HttpStatus.UNAUTHORIZED,
                        message: 'Invalid credentials',
                    },
                };
            }
            console.log('❌ [AUTH SERVICE] Unexpected error occurred');
            return {
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unexpected error occurred',
                data: null,
                error: {
                    code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'An unexpected error occurred',
                },
            };
        }
    }
    async verifyUserProfileEmail(stateCode) {
        try {
            const userRecord = await this.firebaseService
                .getAuth()
                .verifyIdToken(stateCode);
            if (!userRecord?.emailVerified) {
                await this.firebaseService
                    .getFirestore()
                    .collection('profiles')
                    .doc(userRecord?.uid)
                    .set({ isVerified: true }, { merge: true });
                return {
                    message: 'Email verified successfully',
                    statusCode: common_1.HttpStatus.OK,
                    data: null,
                    error: null,
                };
            }
            else {
                return {
                    message: 'Email already verified, trying to login.',
                    statusCode: common_1.HttpStatus.OK,
                    data: null,
                    error: null,
                };
            }
        }
        catch (error) {
            return {
                message: 'An error occurred while verifying email',
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                error: {
                    code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'An error occurred while verifying email',
                },
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], AuthService);
//# sourceMappingURL=auth.service.js.map