import Home from "./Home";
import Branches from "./Branches";
import "./styles.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRepo, getBranches } from "./api";

export default function App() {
  const nav = useNavigate();
  const [repoData, setRepoData] = useState({
    name: "",
    desc: "",
    branches: []
  });
  const [userSearch, setUserSearch] = useState({
    owner: "",
    name: ""
  });

  // console.log({ userSearch });

  // useEffect(() => {
  //   getBranches(userSearch.owner, userSearch.name).then((data) =>
  //     setRepoData({ ...repoData, branches: data })
  //   );
  //   getRepo(userSearch.owner, userSearch.name).then((data) =>
  //     setRepoData({ ...repoData, name: data.name, desc: data.description })
  //   );
  //   // nav(`/branches/${repoData.name}`)
  // }, [userSearch]);

  // console.log({ repoData });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home setUserSearch={setUserSearch} />} />
        <Route path="/branches/:owner/:name" element={<Branches />} />
      </Routes>
    </div>
  );
}

//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
