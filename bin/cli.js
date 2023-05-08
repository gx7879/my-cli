#! /usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");

program
  // 定義命令和參數
  .command("create <app-name>")
  .description("create a new project")
  // -f or --force 為強制創建，如果創建的目錄存在則直接覆蓋
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // 在 create.js 中執行創建任務
    require("../lib/create.js")(name, options);
  });

program
  // 配置版本號信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

// 配置 config 命令
program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value from option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option from config")
  .action((value, options) => {
    console.log(value, options);
  });

// 配置 ui 命令
program
  .command("ui")
  .description("start add open roc-cli ui")
  .option("-p, --port <port>", "Port used for the UI Server")
  .action((option) => {
    console.log(option);
  });

program
  // 監聽 --help 執行
  .on("--help", () => {
    // 使用 figlet 繪製 Logo
    console.log(
      "\r\n" +
        figlet.textSync("chyo", {
          font: "Ghost",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
    );

    // 新增說明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `chyo <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

// 解析用户执行命令传入参数
program.parse(process.argv);
