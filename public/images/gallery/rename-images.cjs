const fs = require("fs");
const path = require("path");

const folder = ".";
const prefix = "photo_";

const files = fs
  .readdirSync(folder)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();

files.forEach((file, index) => {
  const ext = path.extname(file).toLowerCase();
  const newName = `${prefix}${String(index + 1).padStart(4, "0")}${ext}`;
  const oldPath = path.join(folder, file);
  const newPath = path.join(folder, newName);

  fs.renameSync(oldPath, newPath);
  console.log(`Renamed: ${file} → ${newName}`);
});
