// One-off: derive favicons from the deity image (crop of Swami's face).
// Run with `npm run icons`; outputs are committed to public/.
import sharp from 'sharp';

const src = 'src/assets/swami.jpg';
const face = { left: 497, top: 200, width: 240, height: 240 };
const tightFace = { left: 522, top: 225, width: 190, height: 190 };

const jobs = [
  { crop: tightFace, size: 32, out: 'public/favicon-32.png' },
  { crop: face, size: 180, out: 'public/apple-touch-icon.png' },
  { crop: face, size: 192, out: 'public/icon-192.png' },
];

for (const { crop, size, out } of jobs) {
  await sharp(src)
    .extract(crop)
    .resize(size, size)
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out);
  console.log('wrote', out);
}
