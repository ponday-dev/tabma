import simpleGit from "simple-git";

const git = simpleGit();

git.branch(["foo"], (res) => {
  console.log(res);
});
