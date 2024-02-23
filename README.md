# [QuickChat](https://quick-chat.eifm.store/)

單純練習用，做個簡單留言板，練習 React、串接、資料庫 CURD 以及部署 GCP 的部分（將暱稱存入 localStorage 去驗證不同使用者，所以不設計會員系統）

全部用 Docker 打包部署在 GCP

1. 前端 React
2. 後端 NestJS
3. 資料庫 PostgreSQL
4. Nginx
5. certbot 在 Docker 內申請 SSL 憑證，需要手動設定 Godaddy DNS 的 TXT 紀錄，所以無法自動更新到期日 certbot 沒有支援 GoDaddy 的 API ，如果是 NET 就可以自動更新

---

未完成：

1. 留言板功能大致上完成（還沒上雲測試）
2. 留言內容修改、刪除功能

---

未來可以處理的部分：

1. 改為 Socket.IO 變成即時聊天室
2. 建立會員系統
3. 研究 CName 設定，在 GCP 內使用同網域部署不同專案，Nginx 皆使用 docker 打包
