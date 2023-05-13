import Home from "./Home";
import BranchesPage from "./BranchesPage";
import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";


export default function App() {
  const [repoData, setRepoData] = useState({
    name: "",
    desc: "",
    branches: []
  });
  const [userSearch, setUserSearch] = useState({
    owner: "",
    name: ""
  });

  // useEffect(() => {
  //   getBranches(userSearch.owner, userSearch.name).then((data) =>
  //     setRepoData({ ...repoData, branches: data })
  //   );
  //   getRepo(userSearch.owner, userSearch.name).then((data) =>
  //     setRepoData({ ...repoData, name: data.name, desc: data.description })
  //   );
  //   // nav(`/branches/${repoData.name}`)
  // }, [userSearch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/branches/:owner/:name" element={<BranchesPage />} />
      </Routes>
    </div>
  );
}

//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
