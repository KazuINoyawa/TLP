const path = require('path');
const fs = require('fs');

function saveImage(file, destId) {
  const uploadDir = path.join(__dirname, '../../../client/public/uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  const ext = path.extname(file.originalname);
  const fileName = `destination_${destId}_${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, file.buffer);
  return `/uploads/${fileName}`;
}

module.exports = { saveImage };
