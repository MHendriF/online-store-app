import { Dispatch, SetStateAction } from "react";
import styles from "./InputFile.module.scss";

type PropTypes = {
  uploadedImage: File | null;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  name: string;
};

export default function InputFile(props: PropTypes) {
  const { uploadedImage, setUploadedImage, name } = props;

  return (
    <div className={styles.file}>
      <label htmlFor={name} className={styles.file__label}>
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p>Upload a new image, large image will be resized automatically</p>
            <p>
              Maximum upload size is <b>1 MB</b>
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className={styles.file__input}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </div>
  );
}
