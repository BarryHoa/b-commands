import * as vscode from "vscode";

let terminal: vscode.Terminal | undefined;
const changeEnv = (outputChannel: vscode.OutputChannel) => {
  let disposable = vscode.commands.registerCommand(
    "bcommands.changeEnv",
    async () => {
      const envs =
        vscode.workspace
          .getConfiguration("bCommands")
          .get<Record<string, any>>("envs") || {};

      const envsText = envs?.envs || "";

      const envsSplit = String(envsText)
        ?.split(",")
        .filter((x: string) => !!x);

      const options = Array.isArray(envsSplit) ? envsSplit : [];
      let envSelected = envs?.default;

      if (options.length > 0) {
        const envFromOption = await vscode.window.showQuickPick(options, {
          placeHolder: "Select an env",
        });

        if (envFromOption) {
          envSelected = envFromOption;
        }
      }

      outputChannel.appendLine(`select  env: ${envSelected}`);
      outputChannel.show();

      if (!envSelected) {
        vscode.window.showInformationMessage(
          `You selected env: ${envSelected}`
        );
        return;
      }

      vscode.window.showInformationMessage(`You selected env: ${envSelected}`);

      if (!terminal) {
        // Create a new terminal if it doesn't exist
        terminal = vscode.window.createTerminal("ENV: use env");
        terminal.show(); // Show the terminal
      } else {
        // If the terminal already exists, just show it
        terminal.show();
      }
      // skill 3000
      outputChannel.appendLine(`Kill Port 3000 and 3001`);
      terminal.sendText("kill -9 $(lsof -t -i:3000 -i:3001)");
      terminal.sendText(`cp -f  envs/.${envSelected} .env`);
      terminal.sendText(`yarn dev`);

      // terminal.sendText(
      //   "git branch -vv | grep 'origin/.*: gone]' | awk '{print $1}' | xargs git branch -D"
      // );
      terminal.show();
    }
  );
  return disposable;
};
export default changeEnv;
