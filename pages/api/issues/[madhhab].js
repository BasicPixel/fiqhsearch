import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../../src/client";

export default async function handler(req, res) {
  const querySnapshot = await getDocs(
    collection(getFirestore(app), req.query.madhhab)
  );

  const data = querySnapshot.docs.map((document) => {
    return { ...document.data(), id: document.id };
  });

  res.status(200).json(data);
}
