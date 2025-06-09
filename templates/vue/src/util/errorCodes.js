const errorCodes = {
  404: {
    message: "Not Found",
    description: "請求的資源未找到。",
  },
  500: {
    message: "Internal Server Error",
    description: "伺服器遇到意外情況，無法完成請求。",
  },
  403: {
    message: "Forbidden",
    description: "伺服器理解請求，但拒絕執行。",
  },
  400: {
    message: "Bad Request",
    description: "伺服器無法理解請求的語法。",
  },
  401: {
    message: "Unauthorized",
    description: "請求要求身份驗證。",
  },
};

export default errorCodes;
