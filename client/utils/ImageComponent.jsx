import React from "react";

const ImageComponent = ({ base64String, features, altName}) => {
  console.log(features)
  return <img className={features} src={`data:image/jpeg;base64,${base64String}`} alt={altName} />;
};

export default ImageComponent;