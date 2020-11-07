const core = require('@actions/core');
const github = require('@actions/github');

try {
  const script = escape(core.getInput('script'));
  const { exec, spawn } = require('child_process');
  
  // TODO this seems pretty insecure.
  exec('"C:\\Program Files\\Epic Games\\UE_4.25\\Engine\\Build\\BatchFiles\\RunUAT.bat" BuildGraph -Script="' + script + '"', (err, stdout, stderr) => {
    if (err) {
      core.setFailed(err);
      return;
    }
    console.log(stdout);
  });
} catch (error) {
  core.setFailed(error.message);
}
