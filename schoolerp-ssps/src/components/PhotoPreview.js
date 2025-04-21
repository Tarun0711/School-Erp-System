import React from 'react'
import "../Css/PhotoPreview.css"

const PhotoPreview = ({ photo }) => {
  return (
    <div className="photo-preview">
      {photo && (
        <img
          src={URL.createObjectURL(photo)}
          alt="Student Photo"
          className="preview-image"
        />
      )}
    </div>
  )
}

export default PhotoPreview
