練習用

# [QuickChat](https://quick-chat.eifm.store/)

Docker 內包 Nginx、主程式、資料庫，並在 Docker 內申請 SSL 憑證，因為需要手動設定 DNS 的 TXT 紀錄，所以無法自動更新到期日（ Certbot 沒有支援 GoDaddy 的 API ，如果是 NET 就可以）

1. 留言、登出功能正常運做（還沒上雲測試）
2. 重整頁面沒有顯示之前留言內容
3. 未實現留言修改、刪除
4. 未實現多人留言
