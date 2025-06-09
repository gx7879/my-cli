const path = require("path");
// fs-extra 是對 fs 模塊的擴展，支持 promise 語法
const fs = require("fs-extra");
const inquirer = require("inquirer").default;
const chalk = require("chalk");
const Generator = require("./Generator");

module.exports = async function (name, options) {
  // 執行創建命令

  // 當前命令行選擇的目錄
  const cwd = process.cwd();
  // 需要創建的目錄地址
  const targetAir = path.join(cwd, name);

  // 目錄是否已經存在？
  if (fs.existsSync(targetAir)) {
    // 是否為強制創建？
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      // 詢問使用者是否確定要覆蓋
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists Pick an action:",
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);

      if (!action) {
        console.log(chalk.yellow("操作已取消"));
        return;
      } else if (action === "overwrite") {
        // 移除已存在的目錄
        console.log(`\r\nRemoving...`);
        await fs.remove(targetAir);
      }
    }
  }

  // 創建項目
  const generator = new Generator(name, targetAir);

  // 開始創建項目
  generator.create();
};
