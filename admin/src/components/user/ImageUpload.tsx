import imageCompression from "browser-image-compression";

export const imageUpload = async (images: any) => {
  let imgArr = [];

  if (images.size > 0) {
    throw new Error("no image selected");
  } else {
    for (const item of images) {
      if (item.size > 7 * 1024 * 1024) {
        throw new Error("size should be less then 7 mb");
      } else {
        const formData = new FormData();

        const compressedFile = await imageCompression(item, { maxSizeMB: 0.5 });

        formData.append("file", compressedFile);

        formData.append("upload_preset", "jxxkhti2");

        formData.append("cloud_name", "dxepcudkt");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dxepcudkt/upload",

          {
            method: "POST",

            body: formData,
          }
        );

        const data = await res.json();

        imgArr.push({ public_id: data.public_id, url: data.secure_url });
      }

      return imgArr;
    }
  }
};
