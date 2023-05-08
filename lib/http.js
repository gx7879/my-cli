// 通過 axios 處理請求
const axios = require("axios");

axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 獲取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return axios.get("https://api.github.com/orgs/offer-template/repos");
}

/**
 * 獲取版本信息
 * @param {string} repo 模板名稱
 * @returns Promise
 */
async function getTagList(repo) {
  return axios.get(`https://api.github.com/repos/offer-template/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList,
};
