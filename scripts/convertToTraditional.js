// scripts/convertToTraditional.cjs
const fs = require("fs");
const path = require("path");
const OpenCC = require("opencc-js");

// 创建简体转繁体转换器
const converter = OpenCC.Converter({ from: "cn", to: "tw" });
const tify = (text) => converter(text);

// 根目录，和 scripts 同级
const rootDir = path.resolve(__dirname, "..");

// 需要处理的文件夹
const folders = ["api", "components", "hooks", "model", "pages", "utils"];

// 支持处理的文件后缀
const exts = [".vue", ".js", ".ts", ".json", ".html", ".css", ".scss", ".less"];

// 遍历目录并转换中文
function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      walkDir(filepath);
    } else {
      const ext = path.extname(file);
      if (!exts.includes(ext)) return;

      let content = fs.readFileSync(filepath, "utf8");
      const converted = tify(content);

      if (content !== converted) {
        fs.writeFileSync(filepath, converted, "utf8");
        console.log(`✔ 已转换: ${filepath}`);
      }
    }
  });
}

// 遍历指定文件夹
folders.forEach(folder => {
  const folderPath = path.join(rootDir, folder);
  if (fs.existsSync(folderPath)) {
    walkDir(folderPath);
  } else {
    console.warn(`⚠ 文件夹不存在: ${folderPath}`);
  }
});

console.log("🎉 所有文件转换完成！");
