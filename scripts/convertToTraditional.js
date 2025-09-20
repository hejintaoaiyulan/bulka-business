// scripts/convertToTraditional.cjs
const fs = require("fs");
const path = require("path");
const OpenCC = require("opencc-js");

// 創建簡體轉繁體轉換器
const converter = OpenCC.Converter({ from: "cn", to: "tw" });
const tify = (text) => converter(text);

// 根目錄，和 scripts 同級
const rootDir = path.resolve(__dirname, "..");

// 需要排除的文件夾
const excludeDirs = ["node_modules", "uni_modules", "unpackage"];

// 支持處理的文件後綴
const exts = [".vue", ".js", ".ts", ".json", ".html", ".css", ".scss", ".less"];

// 遍歷目錄並轉換中文
function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      // 跳過排除的目錄
      if (excludeDirs.includes(file)) {
        console.log(`⏭ 跳過目錄: ${filepath}`);
        return;
      }
      walkDir(filepath);
    } else {
      const ext = path.extname(file);
      if (!exts.includes(ext)) return;

      let content = fs.readFileSync(filepath, "utf8");
      const converted = tify(content);

      if (content !== converted) {
        fs.writeFileSync(filepath, converted, "utf8");
        console.log(`✔ 已轉換: ${filepath}`);
      }
    }
  });
}

// 從根目錄開始遍歷
console.log("🚀 開始轉換簡體中文為繁體中文...");
walkDir(rootDir);

console.log("🎉 所有文件轉換完成！");
