import * as admin from 'firebase-admin';
export declare class FirebaseService {
    private admin;
    collections: {
        profiles: string;
        availability_slots: string;
        bookings: string;
        services: string;
        health_tips: string;
    };
    constructor();
    getAuth(): import("firebase-admin/lib/auth/auth").Auth;
    getFirestore(): admin.firestore.Firestore;
    getFireStore(): admin.firestore.Firestore;
    getStorage(): import("firebase-admin/lib/storage/storage").Storage;
    getMessage(): import("firebase-admin/lib/messaging/messaging").Messaging;
}
