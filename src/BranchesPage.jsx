import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRepo, getBranches } from "./api";
import { AiOutlineArrowLeft, AiOutlineStar } from "react-icons/ai";
import Branch from "./Branch";

export default function BranchesPage() {
  const params = useParams();
  const nav = useNavigate()
  // console.log({ params });
  const [repoData, setRepoData] = useState({
    name: "",
    owner: "",
    desc: "",
    watchers: "",
    branches: []
  });

  // useEffect(() => {
  //     getBranches(params.owner, params.name)
  //     // .then(data=>console.log(data))
  //     .then((data) =>setRepoData({ ...repoData, branches: data }));
      
  //     getRepo(params.owner, params.name).then((data) =>
  //       setRepoData({
  //         ...repoData,
  //         name: data.name,
  //         desc: data.description,
  //         watchers: data.watchers
  //       })
  //     );
  // }, []);
  
  useEffect(() => {

      getBranches(params.owner, params.name)
      // .then(data=>console.log(data))
      .then((data) =>setRepoData({ ...repoData, branches: data }));
      
      getRepo(params.owner, params.name).then((data) =>
        setRepoData({
          ...repoData,
          name: data.name,
          desc: data.description,
          watchers: data.watchers
        })
      );
  }, []);

  console.log({ repoData });
  console.log(repoData.branches)

  return (
    <div className="main">
      <div className="header">
        <button onClick={()=>nav('/')}>
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
      <div className="branches-container column">
        <div className="in-progress column">
          <p>In progress</p>
          <div className="in-progress-container">
{/*             
            {repoData.branches.length ? repoData.branches.map((_, i) => <p>{i}</p>) : null} */}
          </div>
        </div>
        <div className="review column">
          Review
        </div>
        <div className="merge column">
          Ready to Merge
        </div>
      </div>
    </div>
  );

}
