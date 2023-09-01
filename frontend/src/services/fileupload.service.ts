import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 as uuidv4 } from 'uuid';


export const uploadFile = async (file: File, remote_dir_path: string, remote_filename?: string) => {
    if (!remote_filename) {
        remote_filename = uuidv4() + "." + file.name.split('.').pop();
    }
    const imageRef = ref(storage, `uploads/${remote_dir_path}/${remote_filename}`);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;

};