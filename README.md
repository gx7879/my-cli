# chyo-cli 前端模板工具

#### 功能為方便的創建模板，加速前期開發，當前專案已發布至 npm，模板則放置在 github 以配合 github api 來完成模板的取得

&emsp;

# Installation

### 🍎 安装工具

```bash
npm i -g chyo-cli
```

### 🍏 使用工具創建項目

```bash
chyo create project-name
```

&emsp;

#目錄以及功能

# bin/cli

#### 為定義命令功能

&emsp;

# lib/create

#### 為創建命令以及目錄的

&emsp;

# lib/Generator

#### 為根據使用者選擇拼湊模板位置和 tag 標籤並利用 github api 至遠端下載專案至本地目錄

&emsp;

# lib/http

#### 為處理 github api 以及 tag 標籤並導出

&emsp;

# 使用插件

```json
  "dependencies": {
    "axios": "^0.21.4",
    "chalk": "^4.1.2",
    "commander": "^8.1.0",
    "download-git-repo": "^3.0.2",
    "ejs": "^3.1.6",
    "figlet": "^1.5.2",
    "fs-extra": "^10.0.0",
    "inquirer": "^8.1.2"
  }
```

commander: 命令行自定義指令  
inquirer: 命令行詢問用戶問題，記錄回答結果  
chalk: 控制台輸出內容樣式美化  
figlet: 控制台顯示 logo  
fs-extra: 系統 fs 模塊的擴展，提供了更多便利的 API，並繼承了 fs 模塊的 API  
download-git-repo: 下載遠程模版
