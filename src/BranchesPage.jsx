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

  // console.log({ repoData });
  // console.log(repoData.branches);
  console.log({branches})

  return (
    <div className="main">
      <div className="header">
        <button className="button" onClick={() => nav("/")}>
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
          Review
          {branches
            .filter((branch) => branch.index === 1)
            .map((branch) => (
              <Branch name={branch.name} handleMoveColumn={handleMoveColumn} />
            ))}
        </div>
        <div className="merge column">
          Ready to Merge
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
    console.log({branches})
    //get all branches except the one being moved
    const filteredBranches = [...branches].filter(branch=>branch.name!=name)
    const movedBranch = [...branches].find((branch) => branch.name === name);
    
    if (direction == "left" && movedBranch.index>=1) movedBranch.index -= 1;
    else if (direction == "right" && movedBranch.index<=1) movedBranch.index += 1;
    
    setBranches([filteredBranches, movedBranch].flat());
  }

}
