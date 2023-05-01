import fs from 'fs';

const removeOrderImage = (hash: string) => {
  fs.unlink(`uploads/${hash}.jpg`, (err) => {
    if (err && err.code === 'ENOENT') {
      console.info(`[hash: ${hash}] File doesn't exist, won't remove it.`);
    } else if (err) {
      console.error(`[hash: ${hash}] Error occurred while trying to remove file`);
    } else {
      console.log(`[hash: ${hash}] Removed file`);
    }
  });
};
export default removeOrderImage;
