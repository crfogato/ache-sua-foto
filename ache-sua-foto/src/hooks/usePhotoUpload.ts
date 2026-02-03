import { ref, get, set } from "firebase/database";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { db, storage } from "../services/firebase";
import { generateRandomCode, getFileName } from "../utils/formatters";

export const usePhotoUpload = () => {
  const uploadPhoto = async (day: string, file: File) => {
    let isUnique = false;
    let code = "";

    while (!isUnique) {
      code = generateRandomCode();
      const checkRef = ref(db, `usedCodes/${day}/${code}`);
      const snapshot = await get(checkRef);

      if (!snapshot.exists()) {
        isUnique = true;

        await set(checkRef, true);
      }
    }

    const fileName = getFileName(code);
    const fileRef = storageRef(storage, `${day}/${fileName}`);

    await uploadBytes(fileRef, file);
    return code;
  };

  return { uploadPhoto };
};
