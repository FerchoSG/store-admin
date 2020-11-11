import { createContext } from 'react';
import firebase from "./firebase";

const FirebaseContext = createContext({ firebase })

export default FirebaseContext;