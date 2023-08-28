// just a header to show that the page is under construction

import { Text, Center } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

// Import the functions you need from the SDKs you need
import { storage } from "../firebase";
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const Test = () => {
  const [file, setFile] = useState<File>();
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const clickAction = async () => {
    console.log(file);
    if (file == null) return;
    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot: UploadResult) => {
      getDownloadURL(snapshot.ref).then((url: string) => {
        // setImageUrls((prev) => [...prev, url]);
        console.log(url);
      });
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Center>
      <input type="file" name="file" onChange={handleFileChange} />
      <div>{file && `${file.name} - ${file.type}`}</div>
      <button onClick={clickAction}>upload</button>
    </Center>
  );
};

export default Test;
