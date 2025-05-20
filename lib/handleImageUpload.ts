export const handleImageUpload = async (file: File): Promise<string | null> => {
    try {
        const formData = new FormData();
        const url = `https://api.imgbb.com/1/upload?key=125913941a6683504c02b588ca87138f`;
        formData.append("image", file);

        // console.log(uploadURL);
        // return
        const response = await fetch(`${url}`, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            return result.data.url; // Return the image URL
        } else {
            throw new Error("Image upload failed");
        }
    } catch (error) {
        console.error("Image upload error:", error);
        // message.error("Failed to upload image");
        return null;
    }
};
