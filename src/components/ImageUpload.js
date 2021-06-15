import { useState } from "react";

import firebase from 'firebase'
import { storage, db } from "../firebase";

//initializing the storage
//creating the storage and image reference
const storageRef = storage.ref();
const imageRef = storageRef.child("images");

const ImageUpload = (props) => {
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(0)
  const [currProgress, setCurrProgres] = useState(0);
  const [downloadURL, setDownloadURL] = useState('')

  const handleUpload = (e) => {
    const file = e.target.files[0];
    //Getting the file metadata
    setFileSize(file.size)

    setImageFile(file);
    setFileName(file.name);
    console.log(file);
  };

  const handleUploadSubmit = (e) => {
    let metadata = {
      contentType: "image/*"
    };
    //for running upload
    const uploadTask = imageRef.child(fileName).put(imageFile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const {
          bytesTransferred,
          totalBytes,
        } = snapshot;
        const progress = Math.round((bytesTransferred / totalBytes) * 100);
        setCurrProgres(progress);
      },
      //for errors during the upload
      (error) => console.log(error),
      //after the upuload completes
      //getting the download url for the file
      () => {
        setCurrProgres(0);
        setFileName("");
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((url) => 
          // This can be downloaded directly:
    
          {

            setDownloadURL(url)
          //store the data to the firestore
          db.collection('test').add({
            name: fileName,
            downloadURL,
            size: fileSize,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
          })}
          );
      }
    );
  };

  return (
    <>
      <input type="file" onChange={handleUpload} />
      <button type="submit" onClick={handleUploadSubmit}>
        Submit
      </button>
      <progress max="100" value={currProgress} />
      <img src={downloadURL} />
      <a download href={downloadURL}  >Download the image </a>

    </>
  );
};

export default ImageUpload;
