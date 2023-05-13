import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRepo, getBranches } from "./api";
import { AiOutlineArrowLeft, AiOutlineStar } from "react-icons/ai";

export default function Branches() {
  const params = useParams();
  console.log({ params });
  const [repoData, setRepoData] = useState({
    name: "",
    owner: "",
    desc: "",
    watchers: "",
    branches: []
  });

  useEffect(() => {
    getBranches(params.owner, params.name).then((data) =>
      setRepoData({ ...repoData, branches: data })
    );
    getRepo(params.owner, params.name).then((data) =>
      setRepoData({
        ...repoData,
        name: data.name,
        desc: data.description,
        watchers: data.watchers
      })
    );
  }, []);

  // console.log({ repoData });

  return (
    <div className="main">
      <div className="header">
        <button onClick={handleReturnClick}>
          <AiOutlineArrowLeft />
        </button>
        <div className="description">
          {repoData.name ? <h1>{repoData.name}</h1> : <div>Loading...</div>}
          {repoData.desc ? repoData.desc : null}
        </div>
        <div>
          <AiOutlineStar />
          {repoData.watchers}
        </div>
      </div>
    </div>
  );

  function handleReturnClick() {}
}
