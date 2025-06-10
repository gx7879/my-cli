const path = require("path");
const fs = require("fs-extra");

const TEMPLATE_REPLACEABLE_EXTENSIONS = [".js", ".ts", ".json", ".md", ".html"];

/**
 * 生成或更新 package.json 文件。
 * @param {string} projectName - 專案名稱。
 * @param {string} targetDir - 目標目錄。
 * @param {string} [version="1.0.0"] - 專案版本號。
 */
async function generatePackageJson(projectName, targetDir, version = "1.0.0") {
  const packageJsonPath = path.join(targetDir, "package.json");
  let packageJson = {};

  if (await fs.pathExists(packageJsonPath)) {
    packageJson = await fs.readJson(packageJsonPath);
  }

  packageJson.name = projectName;
  packageJson.version = version;

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

/**
 * 在單一文件中替換變數。
 * @param {string} filePath - 文件路徑。
 * @param {object} replacements - 替換鍵值對。
 */
async function replaceInFile(filePath, replacements) {
  let content = await fs.readFile(filePath, "utf-8");

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    content = content.replace(regex, value);
  }

  await fs.writeFile(filePath, content);
}

/**
 * 遞迴地在目錄中替換文件內的變數。
 * @param {string} dir - 目錄路徑。
 * @param {object} replacements - 替換鍵值對。
 */
async function replaceVariablesInDir(dir, replacements) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await replaceVariablesInDir(filePath, replacements);
    } else if (
      TEMPLATE_REPLACEABLE_EXTENSIONS.some((ext) => file.endsWith(ext))
    ) {
      await replaceInFile(filePath, replacements);
    }
  }
}

module.exports = {
  generatePackageJson,
  replaceInFile,
  replaceVariablesInDir,
};
