import config from "../config";

export const cloudinaryUpload = async (source: string) => {
  const data = new FormData();
  data.append("file", source);
  data.append("upload_preset", config.UPLOAD_PRESET);
  data.append("cloud_name", config.CLOUD_NAME);
  const res = await fetch(config.CLOUNDINARY_API_BASE_URL, {
    method: "post",
    body: data
  });
  const resJson = await res.json();
  if (resJson.error) {
    console.log("Error Image: ", resJson.error.message);
    return;
  }
  return resJson.url;
};
