import fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const removeOfferImages = (newHashes: string[], oldHashes: string[]) => {
  const removedHashes = oldHashes.filter((hash) => !newHashes.includes(hash));
  console.debug(removedHashes);
  removedHashes.forEach((individualHash) => {
    fs.unlink(`offer/${individualHash}.jpg`, (err) => {
      if (process.env.ENVIROMENT !== 'TEST') {
        if (err && err.code === 'ENOENT') {
          console.info(`[hash: ${individualHash}] File doesn't exist, won't remove it.`);
        } else if (err) {
          console.error(`[hash: ${individualHash}] Error occurred while trying to remove file`);
        } else {
          console.log(`[hash: ${individualHash}] Removed file`);
        }
      }
    });
  });
};
export default removeOfferImages;
