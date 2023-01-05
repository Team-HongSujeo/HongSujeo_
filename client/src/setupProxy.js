const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프록시를 사용할 경로 (path)
    createProxyMiddleware({
      target: 'http://localhost:5000', // target 은 내가 프록시로 이용할 서버의 주소
      changeOrigin: true, // changeOrigin은 대상 서버의 구성에 따라 호스트 헤더의 변경을 해주는 옵션
    })
  );
};

// 서버와 클라이언트 사이에 중계기로서 대리로 통신을 수행하는 것을 가리켜 '프록시', 그 중계 기능을 하는 것을 프록시 서버라고 부른다