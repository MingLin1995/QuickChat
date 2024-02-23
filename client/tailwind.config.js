/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 掃描 src 資料夾下所有的 JS, JSX, TS, 和 TSX 文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  mode: "jit", // 啟用 JIT 模式
  purge: ["./src/**/*.{js,jsx,ts,tsx,html}"], // 設定需要清除未使用樣式的路徑
};
