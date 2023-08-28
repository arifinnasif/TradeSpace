// just a header to show that the page is under construction

import { Text, Center, Image } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

// Import the functions you need from the SDKs you need
import { uploadFile } from "../services/fileupload.service";

import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

const Test = () => {
  const [file, setFile] = useState<File>();
  const [uploadedFilesURLList, setuploadedFilesURLList] = useState<string[]>(
    []
  );

  const clickAction = async () => {
    if (file == null) return;
    await uploadFile(file, "ads").then((url: string) => {
      setuploadedFilesURLList((prev) => [...prev, url]);
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Center>
        <input type="file" name="file" onChange={handleFileChange} />
        <div>{file && `${file.name} - ${file.type}`}</div>
        <button onClick={clickAction}>upload</button>
      </Center>
      <Center>
        {uploadedFilesURLList.map((url, key) => (
          <Image key={key} src={url} />
        ))}
      </Center>
    </>
  );
};

export default Test;
