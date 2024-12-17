"use client"
import { useEffect, useState } from "react";


export default function page() {
  const [files,setFiles] = useState([])
  const [uploading,setUploading] = useState(false)
  const [imageUploadError,setImageUploadError] = useState(false)
  const [formData,setFormData] = useState({
    imageUrls:[],
  })
  const handleRemoveImage = (index) => {
   setFormData((prevData) => ({
    ...prevData,
    imageUrls: prevData.imageUrls.filter((_,i) => i !== index),
   }))
  }
  
   const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      setImageUploadError("Please select at least one image.");
      return;
    }
    setUploading(true);
    setImageUploadError(false);
    

    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "real_estate"); 
        formData.append("cloud_name", "dxynl2h7h"); 

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dxynl2h7h/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        uploadedImages.push(data.secure_url);
        console.log(data.url)
        console.log(files);
       
        
        
        
      }

      setFormData((prevfiles) => ({
        ...prevfiles,
        imageUrls: uploadedImages,
      }));
      setFiles([]);
      
      alert("Images uploaded successfully!");
    } catch (error) {
      setImageUploadError("Failed to upload images. Please try again.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  useEffect(() => {
    if(formData.imageUrls.length > 0){
      console.log(formData);
      
    }
  },[formData])
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Create Listing</h1>
      <form className="flex flex-col gap-4 sm:flex-row ">
        <div className="flex flex-col gap-4  flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength="62"
            minLength="10"
            id="name"
          />
          <textarea
            type="text"
            placeholder="description"
            id="description"
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
          />
          <div className=" flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                className="p-3 rounded-lg border border-gray-300"
                min="1"
                max="10"
                required
                id="bedrooms"
              />
              <p>Beds</p>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 rounded-lg border border-gray-300"
                required
                id="bathrooms"
              />
              <p>Baths</p>
            </div>
            <div className=" flex items-center gap-2 ">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="100"
                className="p-3 rounded-lg border border-gray-300"
                required
              />
              <div className=" flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="100"
                className="p-3 rounded-lg border border-gray-300"
                required
              />
              <div className=" flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 ">
          <p className="font-semibold">
            Images:
            <span className="text-gray-600 ml-2 font-normal">
              The first Image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input type="file" 
            multiple id="images"
            className="border border-gray-300 rounded p-3 w-full"
             accept="image/*" 
             onChange={(e) => {
              setFiles(e.target.files)
             }}
             />
            <button disabled={uploading}
            onClick={handleImageSubmit}
             className="p-3 rounded uppercase text-green-700 border border-green-700
            hover:shadow-lg disabled:opacity-80
            ">
              {uploading ? 'Uploading' : 'Upload'}
            </button>
          </div>
              {imageUploadError && (
            <p className="text-red-500 text-sm">{imageUploadError}</p>

          )}
          {formData.imageUrls.map((url,index) => (
            <div onClick={() => handleRemoveImage(index)} key={index} className="flex justify-between border

p-3  items-center">
              <img src={url} alt="list-image" className="w-20 object-contain h-20 rounded-lg" />
              <button className="p-3 rounded-lg text-red-700 uppercase hover:opacity-75">Delete</button>
            </div>
          ) )}
          <button className="p-3 rounded-lg uppercase text-white bg-slate-700
            hover:opacity-95 disabled:opacity-80">Create Listing</button>
        </div>
      </form>
    </main>
  );
}
