import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [repo, setRepo] = useState({
    owner: "",
    name: ""
  });
  const [url, setUrl] = useState("");

  return (
    <div className='home'>
      <h1>Start by pasting the repository URL</h1>
      <form>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="button submit-button" type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    let split = url.split("/");
    const owner = split[3];
    const name = split[4];
    // setRepo({ owner: split[3], name: split[4] });
    navigate(`/branches/${owner}/${name}`);
  }
}

//home component handle fetching data?
//once data is fetched and set to state, pass down branch component a-
