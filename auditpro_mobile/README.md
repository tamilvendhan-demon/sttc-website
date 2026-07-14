# AuditPro India Mobile App

This Flutter project is a professional UI prototype for an Auditor & Tax Filing mobile application tailored for India. It now includes:

- Client portal with ITR progress, document summary, and action cards
- Auditor dashboard with statistics, charts, and client management entry
- Profile and document upload screens for a fuller app experience
- Material 3 styling with a blue/white/green theme
- Firebase-ready structure for authentication, Firestore, storage, and notifications

## Run locally

1. Install Flutter SDK.
2. Open the project folder:
   ```bash
   cd auditpro_mobile
   ```
3. Install dependencies:
   ```bash
   flutter pub get
   ```
4. Launch the app:
   ```bash
   flutter run
   ```

## Build APK

```bash
flutter build apk --release
```

## Firebase integration next step

The app is prepared for Firebase integration. The next step is to connect the placeholder service in the services folder to Firebase Auth, Firestore, Storage, and FCM.
