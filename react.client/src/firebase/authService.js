import {
    signInWithPopup,
    signOut,
    GithubAuthProvider,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebase";

const githubProvider = new GithubAuthProvider();

// логін через GitHub
export async function loginWithGitHub() {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        console.log("Успішний вхід: ", result.user);
        return result.user;
    } catch (error) {
        console.error("Помилка входу через GitHub: ", error);
        throw error;
    }
}

// вихід
export async function logout() {
    await signOut(auth);
}

// отримати Firebase ID Token (для бекенду)
export async function getIdToken(forceRefresh = false) {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken(forceRefresh);
}

// підписка на зміну користувача
export function onUserChanged(callback) {
    return onAuthStateChanged(auth, callback);
}