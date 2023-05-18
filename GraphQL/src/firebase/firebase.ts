import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLX3EStxNXmswFJDBrIMJveCNt2WBZlI0',
  authDomain: 'graphql-dt.firebaseapp.com',
  projectId: 'graphql-dt',
  storageBucket: 'graphql-dt.appspot.com',
  messagingSenderId: '998180238582',
  appId: '1:998180238582:web:fab9d84c3026062ee9e8d7',
  measurementId: 'G-5X4Y4QGZP5',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logInWithEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmailAndPassword = async (email: string, password: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    authProvider: 'local',
    email,
  });
};

export const logout = () => {
  signOut(auth);
};
