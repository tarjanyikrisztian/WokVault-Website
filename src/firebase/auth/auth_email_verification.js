import { getAuth, sendEmailVerification } from "firebase/auth";

const auth = getAuth();
sendEmailVerification(auth.currentUser)
    .then(() => {
        // Email verification sent!
        // ...
    });