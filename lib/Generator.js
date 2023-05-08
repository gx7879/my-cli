const util = require("util");
const downloadGitRepo = require("download-git-repo"); // 不支持 Promise

const { getRepoList, getTagList } = require("./http");
const path = require("path");

const ora = require("ora");
const inquirer = require("inquirer");
const chalk = require("chalk");

// 添加加載動畫
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，傳入提示信息 message
  const spinner = ora(message);
  // 開始加載動畫
  spinner.start();

  try {
    // 執行傳入方法 fn
    const result = await fn(...args);
    // 狀態修改為成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 狀態修改為失敗
    spinner.fail("Request failed, refetch ...");
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目錄名稱
    this.name = name;
    // 創建位置
    this.targetDir = targetDir;

    // 對 download-git-repo 進行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 獲取用戶選擇的模板
  // 1）從遠程拉取模板數據
  // 2）用戶選擇自己新下載的模板名稱
  // 3）return 用戶選擇的名稱

  async getRepo() {
    // 1）從遠程拉取模板數據
    const repoList = await wrapLoading(getRepoList, "waiting fetch template");
    if (!repoList) return;

    // 過濾我們需要的模板名稱
    const repos = repoList.map((item) => item.name);

    // 用戶選擇自己新下載的模板名稱
    const { repo } = await inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repos,
      message: "Please choose a template to create project",
    });

    // 3）return 用戶選擇的名稱
    return repo;
  }

  async getTag(repo) {
    // 1）基於 repo 結果，遠程拉取對應的 tag 列表
    const tags = await wrapLoading(getTagList, "waiting fetch tag", repo);
    if (!tags) return;

    // 過濾我們需要的 tag 名稱
    const tagsList = tags.map((item) => item.name);

    // 2）用戶選擇自己需要下載的 tag
    const { tag } = await inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tagsList,
      message: "Place choose a tag to create project",
    });

    // 3）return 用戶選擇的 tag
    return tag;
  }

  // 下載遠程模板
  // 1）拼接下載地址
  // 2）調用下載方法
  async download(repo, tag) {
    // 1）拼接下載地址
    const requestUrl = `offer-template/${repo}${tag ? "#" + tag : ""}`;

    // 調用下載方法
    await wrapLoading(
      this.downloadGitRepo, // 遠程下載方法
      "waiting download template", // 加載提示信息
      requestUrl, // 參數1: 下載地址
      path.resolve(process.cwd(), this.targetDir)
    ); // 參數2: 創建位置
  }

  // 核心創建邏輯
  // 1）獲取模板名稱
  // 2）獲取 tag 名稱
  // 3）下載模板到模板目錄
  async create() {
    // 1）獲取模板名稱
    const repo = await this.getRepo();

    // 2) 獲取 tag 名稱
    const tag = await this.getTag(repo);

    // 3）下載模板到模板目錄
    await this.download(repo, tag);

    // 4）模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm install");
    console.log("  npm run dev\r\n");
  }
}

module.exports = Generator;
