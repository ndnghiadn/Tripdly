import { Elysia, t } from "elysia";
import verifyToken from "../middleware/verifyToken.ts";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAkMYiVcgNPSXE5nSns-tZJeou4xu1p_mQ",
    authDomain: "tripdly-8f271.firebaseapp.com",
    projectId: "tripdly-8f271",
    storageBucket: "tripdly-8f271.appspot.com",
    messagingSenderId: "352575218992",
    appId: "1:352575218992:web:15782e13030225c5a7d4f5",
    measurementId: "G-ZKH77Y1XY3"
  };
initializeApp(firebaseConfig);
const storage = getStorage();
const uploadRouter = new Elysia()
  // ======= Authentication =======
  .post("/upload", async ({ body: { image } }) => {
    console.log(image.name);
    console.log(image.type);  

    const storageRef = ref(storage, 'caurong2.png');
    await uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
  },
  {
    body: t.Object({
        image: t.File(),
    })
}
  );

export default uploadRouter;
