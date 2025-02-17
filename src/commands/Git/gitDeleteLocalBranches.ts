import * as vscode from "vscode";

const gitDeleteLocalBranches = () => {
  let disposable = vscode.commands.registerCommand(
    "bcommands.gitDeleteLocalBranches",
    () => {
      const terminal = vscode.window.createTerminal(
        "Git Delete Local Branches That Are Not In Remote"
      );
      terminal.sendText("git fetch -p");
      terminal.sendText(
        "git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -D"
      );
      terminal.show();
    }
  );
  return disposable;
};
export default gitDeleteLocalBranches;
