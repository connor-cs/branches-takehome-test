import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRepo, getBranches } from "./api";
import { AiOutlineArrowLeft, AiOutlineStar } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import Branch from "./Branch";

//how to organize data into changeable columns?
//by default, items have index of 0
//increment when moving rightward

export default function BranchesPage() {
  const params = useParams();
  const nav = useNavigate();
  // console.log({ params });
  const [repoData, setRepoData] = useState({
    name: "",
    owner: "",
    desc: "",
    watchers: "",
    branches: [],
  });
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const br = await getBranches(params.owner, params.name);
      const repo = await getRepo(params.owner, params.name);

      br.map((branch) => (branch["index"] = 0));

      setRepoData({
        ...repoData,
        name: repo.name,
        desc: repo.description,
        watchers: repo.watchers,
        branches: br,
      });

      setBranches(br);
    };

    getData();
  }, []);

  // console.log({ repoData });
  // console.log(repoData.branches);
  console.log({branches})

  return (
    <div className="main">
      <div className="header">
        <button className="back-button" onClick={() => nav("/")}>
          <AiOutlineArrowLeft size={30}/>
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
          <p>In progress </p>
          <div className="in-progress-container">
            {repoData.branches.length
              ? repoData.branches
                  .filter((branch) => branch.index === 0)
                  .map((branch, i) => (
                    <Branch
                      name={branch.name}
                      handleMoveColumn={handleMoveColumn}
                    />
                  ))
              : null}
          </div>
        </div>
        <div className="review column">
          <p>Review</p>
          {branches
            .filter((branch) => branch.index === 1)
            .map((branch) => (
              <Branch name={branch.name} handleMoveColumn={handleMoveColumn} />
            ))}
        </div>
        <div className="merge column">
          <p>Ready to Merge</p>
          {branches
            .filter((branch) => branch.index === 2)
            .map((branch) => (
              <Branch name={branch.name} handleMoveColumn={handleMoveColumn} />
            ))}
        </div>
      </div>
    </div>
  );

  function handleMoveColumn(direction, name) {
    //get all branches except the one being moved to avoid duplicates
    const filteredBranches = [...branches].filter(branch=>branch.name!=name)
    const movedBranch = [...branches].find((branch) => branch.name === name);
    
    if (direction == "left" && movedBranch.index>=1) movedBranch.index -= 1;
    else if (direction == "right" && movedBranch.index<=1) movedBranch.index += 1;
    
    setBranches([filteredBranches, movedBranch].flat());
  }

}
