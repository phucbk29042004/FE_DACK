// js/api/axiosClient.js

const axiosClient = axios.create({
  // THAY ĐỔI ĐỊA CHỈ NÀY:
  baseURL: "https://be-dack.onrender.com", 
  timeout: 30000, // Tăng lên 30s vì gói Render Free đôi khi khởi động hơi chậm
  headers: {
    "Content-Type": "application/json"
  }
});

// Tự động gắn token vào mọi request nếu có
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // Log để bạn dễ debug khi làm web
    console.log('Request to:', config.url, 'with token:', token.substring(0, 10) + '...');
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor để xử lý lỗi tập trung
axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Nếu API trả về lỗi 401 (Unauthorized) có nghĩa là token hết hạn
    if (error.response && error.response.status === 401) {
      console.error("Token hết hạn hoặc không hợp lệ, đang chuyển hướng đăng nhập...");
      // localStorage.removeItem("token"); // Tùy chọn: xóa token cũ
      // window.location.href = "/login.html"; // Tùy chọn: chuyển về trang login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;