# chyo-cli

這是一個基於 Node.js 的命令列介面 (CLI) 工具，旨在簡化專案的建立和管理。它提供了一系列指令，幫助開發者快速初始化新專案、管理模板等。

## 安裝

要全域安裝 `chyo-cli`，請執行以下命令：

```bash
npm install -g chyo-cli
```

## 使用方式

安裝完成後，您可以使用 `chyo` 命令來執行各種操作。

### 建立新專案

使用 `chyo create` 命令來建立一個新專案。

```bash
chyo create <project-name>
```

例如：

```bash
chyo create my-vue-app
```

這將引導您選擇一個專案模板並初始化您的新專案。

## 專案結構

本專案的主要目錄結構如下：

```
.
├── bin/              # CLI 執行檔
│   └── cli.js        # CLI 入口點
├── lib/              # 核心邏輯和工具函數
│   ├── create.js     # 專案建立邏輯
│   ├── Generator.js  # 專案生成器
│   ├── http.js       # HTTP 請求工具
│   └── templateUtils.js # 模板相關工具函數
├── templates/        # 專案模板存放目錄
│   └── vue/          # Vue 專案模板範例
└── package.json      # 專案元資料和依賴
```

## 依賴

本專案使用了以下主要依賴：

- [`axios`](https://www.npmjs.com/package/axios): 用於 HTTP 請求。
- [`chalk`](https://www.npmjs.com/package/chalk): 用於終端機輸出樣式。
- [`commander`](https://www.npmjs.com/package/commander): 用於解析命令列參數。
- [`download-git-repo`](https://www.npmjs.com/package/download-git-repo): 用於從 Git 倉庫下載模板。
- [`ejs`](https://www.npmjs.com/package/ejs): 用於模板渲染。
- [`figlet`](https://www.npmjs.com/package/figlet): 用於生成 ASCII 藝術字。
- [`fs-extra`](https://www.npmjs.com/package/fs-extra): 擴展了 Node.js 的 `fs` 模組，提供了更多文件系統操作。
- [`inquirer`](https://www.npmjs.com/package/inquirer): 用於交互式命令列提示。
- [`ora`](https://www.npmjs.com/package/ora): 用於優雅的終端機加載指示器。

## 許可證

本專案根據 ISC 許可證發布。詳情請參閱 `LICENSE` 檔案。

---

**作者**: Wilson <gx7879@gmail.com>
