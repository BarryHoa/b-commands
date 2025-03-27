// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import gitDeleteLocalBranches from "./commands/Git/gitDeleteLocalBranches";
import changeEnv from "./commands/Env/changeEnv";
// import jenskinBuild from "./commands/Jenskin/jenskin";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "bcommands" is now active!');
  const outputChannel = vscode.window.createOutputChannel("B-commands Output");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposableGitDeleteLocalBranches = gitDeleteLocalBranches();
  const disposableEnvChange = changeEnv(outputChannel);
  // const disposableJenskin = jenskinBuild(outputChannel);

  context.subscriptions.push(
    ...[
      disposableGitDeleteLocalBranches,
      disposableEnvChange,
      // disposableJenskin,
    ]
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
