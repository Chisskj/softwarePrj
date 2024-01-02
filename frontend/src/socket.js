const socketCluster = require('socketcluster-client');

// Thực hiện kết nối đến server
const socket = socketCluster.create({
  hostname: '123.31.12.2271',
  port: '8006'
});

// Đăng ký vào kênh cụ thể
const channel = socket.subscribe('notify.user.110');

// Xử lý thông điệp từ kênh
channel.watch((data) => {
  console.log('Received message:', data);
});