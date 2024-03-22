import { Location } from "../models/location.ts";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import firebaseConfig from "../firebaseConfig/index.ts";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);
const storage = getStorage();
export default class LocationController {
  async addLocation({ set, body, createdBy }) {
    try {
      // check unique name
      const { name } = body;

      const location = await Location.findOne({ name });
      if (location) {
        set.status = 400;
        return { message: "Location's name is unique!" };
      }
      // upload image to firebase
      const {images} = body
      const imageUrls = []

      // only one img
      if(images?.length)
        for(let i = 0; i<images.length;i++){
          const nameImg = this.giveNameToImage(images[i])
          console.log(nameImg);
          const storageRef = ref(storage, nameImg);
          const snapshot = await uploadBytes(storageRef, images[i])
          const downloadUrl = await getDownloadURL(snapshot.ref) 
          imageUrls.push(downloadUrl)
          console.log(downloadUrl);  
        }
      // many imgs
      else {
        const nameImg = this.giveNameToImage(images)
        console.log(nameImg);
        const storageRef = ref(storage, nameImg);
        const snapshot = await uploadBytes(storageRef, images)
        const downloadUrl = await getDownloadURL(snapshot.ref) 
        imageUrls.push(downloadUrl)
      }

      const newLocation = new Location({ name, createdBy, imageUrls});
      await newLocation.save();

      set.status = 200;
      return { message: "Created location successfully!" };
    } catch (error) {
      set.status = 500;
      return { message: "Server failed", error: error };
    }
  }
  async getAllLocations() {
    const locations = await Location.find();
    return {
      data: locations,
      status: 200
    }
  }
  async findLocation({address}){
    const docLocations = await Location.find({},{name:1,imageUrls:1});
    return {
      data:docLocations.filter(curr=>curr.name.toLowerCase().includes(address.toLowerCase())),
      status: 200
    }
  }
  giveNameToImage(img:File) {
    const nameImg = img.name.split('.')[0]
    const typeImg = img.type.split('/')[1]
    const now = Date.now().toString()
    const res = nameImg + "-" + now + "." + typeImg
    return res
  }
}
