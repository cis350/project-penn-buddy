import React from 'react';
import NewPost from "../components/NewPost";

function CreatePost() {
  return (
    <div style={{ textAlign: "center", color: '#0096FF' }}>
      <h1>New Post</h1>
      <h2>Find your Travel Buddies!</h2>
      <NewPost />
    </div>
  );
}
export default CreatePost;
