import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ setUserSearch }) {
  const navigate = useNavigate();
  const [repo, setRepo] = useState({
    owner: "",
    name: ""
  });
  const [url, setUrl] = useState("");

  return (
    <div>
      <h1>Start by pasting the repository URL</h1>
      <form>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(url);
    let split = url.split("/");
    // console.log(split);
    //is this okay
    const owner = split[3];
    const name = split[4];
    // setRepo({ owner: split[3], name: split[4] });
    navigate(`/branches/${owner}/${name}`);
  }
}

//home component handle fetching data?
//once data is fetched and set to state, pass down branch component a-
