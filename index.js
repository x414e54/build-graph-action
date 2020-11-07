const core = require('@actions/core');
const github = require('@actions/github');

try {
  const script = core.getInput('script');
  const { exec, spawn } = require('child_process');
  
  if (script.includes('\'') || script.includes('"'))
  {
     core.setFailed("Invalid characters in string");
  }
  
  // TODO this seems pretty insecure.
  exec('"C:\\Program Files\\Epic Games\\UE_4.25\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildGraph -Script="' + script + '"', (err, stdout, stderr) => {
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
