import axios from "axios";
import { toast } from "react-toastify";

const config = {
  BUCKET_NAME: "reproxy-files-storage-bucket",
  PRESIGNED_GENERATOR_LAMBDA:
    "https://alwausvnphsekg3ef2lbwui7qe0axhog.lambda-url.eu-west-2.on.aws/",
};

export const presignedClient = axios.create({
  baseURL: config.PRESIGNED_GENERATOR_LAMBDA,
});

export const getPresignedPayload = async (file, timestamp, document_type) => {
  // Extract required values from the 'Config' object.
  const { BUCKET_NAME } = config;
  // Extract the base name and extension of the file.
  let [baseName, ext] = file.name.split(".");
  baseName = baseName.replace(/[^A-Z0-9]+/gi, "_");
  // Create the key for the S3 bucket based on the file type and s3Location.
  var key = `users/${document_type}/${baseName}-${timestamp}.${ext}`;

  // Create and return the payload object with necessary information for the presigned URL request.
  const payload = {
    bucket_name: BUCKET_NAME,
    key,
    content_type: file.type,
  };
  return payload;
};

export const handleFileUpload = async (files, document_type) => {
  try {
    const uploadPromises = files.map(async function (file) {
      const timestamp = Date.now(); // Corrected timestamp usage
      const payload = await getPresignedPayload(file, timestamp, document_type);

      try {
        const { data } = await presignedClient.post("/", payload);

        await axios.put(data.url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        return data.url; // Return the uploaded file URL
      } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
        throw uploadError; // Rethrow the error to be caught in the outer catch block
      }
    });

    const uploadedFileUrls = await Promise.all(uploadPromises);
    const imageUrls = uploadedFileUrls.map((url) => {
      return url.split("?")[0];
    });
    return imageUrls.join(",");
  } catch (error) {
    console.error("Error uploading files:", error);
    toast.error("Unable to upload files");
    throw error; // Rethrow the error if necessary for further error handling
  }
};
