import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiSquare } from "react-icons/gi";

export default function Home() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState(false);

  return (
    <div className="home">
      <h2>
        <GiSquare size={25} />
        CodeSandbox
      </h2>
      <h1>Start by pasting the repository URL</h1>
      <form>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="button submit-button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
      {errors ? (
        <p className="error">Oops! Something went wrong. Try again</p>
      ) : null}
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(false);
    if (!url.length) {
      setErrors(true);
    } else if (!errors && url.length != 0) {
      let split = url.split("/");
      const owner = split[3];
      const name = split[4];
      navigate(`/branches/${owner}/${name}`);
    }
  }
}
