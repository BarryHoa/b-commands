import * as vscode from "vscode";

let terminal: vscode.Terminal | undefined;
const jenskinBuild = (outputChannel: vscode.OutputChannel) => {
  let disposable = vscode.commands.registerCommand(
    "bcommands.jenskin.build",
    async () => {
      const jenskin =
        vscode.workspace
          .getConfiguration("bCommands")
          .get<Record<string, any>>("jenskin") || {};

      const envsText = jenskin?.branch || "";

      const envsSplit = String(envsText)
        ?.split(",")
        .filter((x: string) => !!x);

      const options = (Array.isArray(envsSplit) ? envsSplit : []).map((env) => {
        return {
          label: env,
          picked: false,
          alwaysShow: true,
        };
      });

      const envPicked = await vscode.window.showQuickPick(options, {
        canPickMany: true,
        placeHolder: "Select branch to build",
      });

      outputChannel.appendLine(`Branch to build: ${envPicked?.join(",")}`);
      outputChannel.show();

      //
      // "mighty-web"

      if (!envPicked?.length) {
        return;
      }
      envPicked.forEach(async (env) => {
        const reload = new URLSearchParams({
          name: "PIPELINE_RELOAD",
          value: "RELOAD",
        }).toString();

        const project = new URLSearchParams({
          name: "GITLAB_PROJECT_NAME",
          value: "atalink-web",
        }).toString();

        const target = new URLSearchParams({
          name: "CUSTOM_GITLAB_TARGET_BRANCH_NAME",
          value: env.label,
        }).toString();

        const query = `${reload}${project}${target}&name=BUILD_STORYBOOK&name=SKIP_DEPLOY&name=SKIP_QUERY_CHANGELOG&value=on`;
        try {
          const response = await fetch(
            "https://jenkins.atalink.com/job/atalink-web/job/build/build?delay=0sec",
            {
              headers: {
                accept:
                  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "accept-language": "en-US,en;q=0.7",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                priority: "u=0, i",
                "sec-ch-ua":
                  '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Linux"',
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "sec-gpc": "1",
                "upgrade-insecure-requests": "1",
                cookie:
                  "JSESSIONID.2c5fea78=node01b4av11i7sypg3o75mhopsdc1191.node0",
                Referer:
                  "https://jenkins.atalink.com/job/atalink-web/job/build/build?delay=0sec",
                "Referrer-Policy": "same-origin",
              },
              body: query,
              method: "POST",
            }
          );
          // Hiển thị kết quả trong Output panel

          outputChannel.appendLine(
            `atalink-web/job/build/build: 'atalink-web: ${env.label} `
          );
          outputChannel.appendLine(JSON.stringify(response ?? {}));
          outputChannel.show();
        } catch (error) {
          vscode.window.showErrorMessage(`Lỗi khi fetch API: ${error}`);
        }
      });
    }
  );
  return disposable;
};
export default jenskinBuild;
