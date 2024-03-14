import React, { useEffect, useState } from "react";
import { useModalStore } from "../../store/modal";
import styles from "../styles/image-uploader.module.css";
import { Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useUserStore } from "../../store/user-store";

const ImageUploadModal = () => {
  const { user } = useUserStore();
  const { isOpen, closeModal } = useModalStore();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setImage(null);
  }, [isOpen]);

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!image) {
        toast.error("Please select an image");
        return;
      }
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", image);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/users/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data);
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error uploading image");
      return;
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleChangeImage = () => {
    const fileInput = document.querySelector("#image");
    fileInput.click();
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modalContainer} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Upload Image</h2>
            <form onSubmit={handleUpload}>
              <div className={styles.form}>
                {image ? (
                  <div className={styles.selectedImage}>
                    <img
                      loading="lazy"
                      src={URL.createObjectURL(image)}
                      alt="Selected Image"
                      onClick={handleChangeImage}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const fileInput = document.querySelector("#image");
                      fileInput.click();
                    }}
                  >
                    Choose Image
                  </button>
                )}
                <input
                  type="file"
                  className={styles.fileInput}
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </div>
              <button
                type="submit"
                className={styles.uploadButton}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Upload"}
              </button>
            </form>

            <button onClick={closeModal} className={styles.closeButton}>
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploadModal;
