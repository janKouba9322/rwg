import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, getDocs } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyDRXfoAi2TXasSA0GrrJ0j5X109nnAWkwU",

  authDomain: "rwg-1-5b443.firebaseapp.com",

  projectId: "rwg-1-5b443",

  storageBucket: "rwg-1-5b443.appspot.com",

  messagingSenderId: "419262371890",

  appId: "1:419262371890:web:c71068f90f37c4547a842b",
  measurementId: "G-KGX0TX7RS1",
});

const db = getFirestore(app);
const items: any[] = [];

export async function getItems() {
  const querySnapshot = await getDocs(collection(db, "words"));
  const w = () => {
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
  };
  w();
}

export { items, db };
