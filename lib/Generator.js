const util = require("util");

const path = require("path");

const ora = require("ora").default;
const inquirer = require("inquirer").default;
const chalk = require("chalk");
const fs = require("fs-extra");
const {
  generatePackageJson,
  replaceVariablesInDir,
} = require("./templateUtils");

class Generator {
  constructor(name, targetDir) {
    // 目錄名稱
    this.name = name;
    // 創建位置
    this.targetDir = targetDir;
  }

  /**
   * 創建專案
   * @param {string} initialProjectName - 初始專案名稱
   * 這個方法會提示使用者選擇專案模板，然後根據選擇的模板複製相應的文件到目標目錄。
   * 它還會生成 package.json 文件，並將專案名稱和版本號寫入其中。
   */
  async createProject(initialProjectName) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "選擇專案模板：",
        choices: [{ name: "Vue3 + TailwindcssV4 + Vite", value: "vue" }],
      },
    ]);

    console.log(chalk.green(`\n正在創建專案 ${this.name}...`));

    const spinner = ora("正在複製模板文件...").start();

    try {
      await this._copyTemplate(answers.template, this.targetDir);
      spinner.text = "正在生成配置文件...";

      // 替換 {{projectName}} 等變數
      await replaceVariablesInDir(this.targetDir, {
        projectName: this.name,
      });

      await generatePackageJson(initialProjectName, this.targetDir);
      spinner.succeed("專案創建完成！");
    } catch (error) {
      spinner.fail("創建專案失敗");
      throw error;
    }
  }

  /**
   * 複製模板文件到目標目錄。
   * @param {string} templateName - 模板名稱。
   * @param {string} targetDir - 目標目錄。
   */
  async _copyTemplate(templateName, targetDir) {
    const templateDir = path.join(__dirname, `../templates/${templateName}`);
    await fs.copy(templateDir, targetDir);
  }

  /**
   * 核心創建邏輯
   * 創建項目
   * 專案創建成功後出現使用提示訊息
   */
  async create() {
    await this.createProject(this.name);

    // 4）模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm install");
    console.log("  npm run dev\r\n");
  }
}

module.exports = Generator;
