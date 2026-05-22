export const uploadImage = async (file: File) => {
  const apiKey = process.env.NEXT_PUBLIC_IMAGE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_IMAGE_API_KEY");
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", apiKey);

  const res = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.error?.message ?? "Image upload failed");
  }

  return data;
};
