export const getBranches = async (owner, name) => {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${name}/branches`
  );
  const data = res.json();
  return data;
};

export const getRepo = async (owner, name) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${name}`);
    const data = res.json();
    return data;
  } catch {
    (e) => console.log(e);
  }
};
