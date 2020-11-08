const core = require('@actions/core');
const github = require('@actions/github');

try {
  const script = core.getInput('script');
  const target = core.getInput('target');
  const projectsroot = core.getInput('projectsroot');
  const { exec, spawn } = require('child_process');
  
  if (script.includes('\'') || script.includes('"') || target.includes('\'') || target.includes('"') || projectsroot.includes('\'') || projectsroot.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  // TODO this seems pretty insecure.
  exec('"C:\\Program Files\\Epic Games\\UE_4.25\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildGraph -Script="' + script + '" -Target="' + target + '" -set:ProjectsRoot="' + projectsroot + '"', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err) {
      core.setFailed(err);
      return;
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
