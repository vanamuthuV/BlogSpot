import React from "react";
import './body.css'

export const ContentBody = () => {
    return (
      <div id="Post_Frame">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    );
};

const Post = () => {
  return (
    <div id="Post">
      <div id="Post_Iamge">
        <img
          className="Post_img"
          src="https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2023/12/Researchers-harness-AI-to-map-visual-functions-in-brain.jpeg"
          alt="Think it’s the brain? It may be the gut: Our nervous system controls a lot more than we think"
        />
      </div>
      <div id="Post_Text">
        <h3>
          Think it’s the brain? It may be the gut: Our nervous system controls a
          lot more than we think
        </h3>
        <p>
          Imagine our bodies are orchestras. Our brain is the conductor. The
          peripheral nervous system (PNS) is the string section, connected
          through all our senses and other inputs that keep our bodies humming.
          Periphery: How Your Nervous System Predicts And Protects Against
          Disease by Moses V Chaoshows that this periphery is actually front and
          centre in the body’s functioning.
        </p>
        <div id="Post_Author">
          <p>
            By
            <a className="Author" href="">
              Vanamuthu V
            </a>
            At
          </p>
          <time>1:30 AM 24 DEC 2023</time>
          <p>Country : IN</p>
        </div>
      </div>
    </div>
  );
}