import { storage } from "../firebase";

//initializing the storage
//creating the storage and image reference
const storageRef = storage.ref();
const imageRef = storageRef.child("images");

const ImageUpload = (props) => {
  console.log(imageRef);
  return <h3>Hello</h3>;
};

export default ImageUpload;
