import { FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const extractText = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      const { data } = await Tesseract.recognize(image, "eng");
      setText(data.text);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
    setLoading(false);
  };

  const clearText = () => {
    setText("");
  };

  const deleteImage = () => {
    setImage(null);
    setText("");
  };
  return (
    <div>
      <div className="container">
        <h2>Demy Text Extractor</h2>
        <label className="custom-file-upload">
          Choose Image
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </label>
        {image && <img src={image} alt="Uploaded" className="preview" />}
        <button onClick={extractText} disabled={loading}>
          {loading ? "Extracting..." : "Extract Text"}
        </button>
        
        {}
        {text && (
        <button onClick={clearText} disabled={loading}>
          Clear Text                                  
        </button>
        )}
        {}
        {image && (
        <button onClick={deleteImage} disabled={loading}>
          Delete Image
        </button> 
        )}
        {loading && <div className="loading-text">Processing image...</div>}
        {text && <div className="text-length">Text length: {text.length}</div>}
        {text && <textarea value={text} readOnly rows="10"></textarea>}
        {loading && <div className="loading-text">Processing image...</div>}
        {text && <div className="text-length">Text length: {text.length}</div>}
      </div>
      
        <footer className='footer'>
          <p> 
              <a 
                  href="https://github.com/RamiMohamed12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
              >
                  <FaGithub className="github-icon" />Created by Rami Mohamed 
              </a>        
          </p>  
        </footer>
      </div>

  );
};

export default ImageUpload;