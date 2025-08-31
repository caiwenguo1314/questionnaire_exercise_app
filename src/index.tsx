import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 引入 Sentry
import * as Sentry from "@sentry/react";

// 初始化 Sentry（dsn 改成你项目里显示的）
Sentry.init({
  dsn: "https://d65b4a868eab97816bce5ef4f93feff6@o4509937294573568.ingest.us.sentry.io/4509937324130304",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.1, // 性能监控采样率
  replaysSessionSampleRate: 0.0, // 默认不开启录屏
  replaysOnErrorSampleRate: 0.1, // 出错时录屏
  environment: process.env.NODE_ENV, // "development" 或 "production"
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Sentry.ErrorBoundary fallback={<h1>出错啦，请稍后再试。</h1>}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Sentry.ErrorBoundary>
);

reportWebVitals();
