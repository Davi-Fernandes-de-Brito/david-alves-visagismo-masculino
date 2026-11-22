// Gera versões otimizadas (WebP 1600/800) das fotografias de palestra.
// Uso: node scripts/prepare-images.cjs <pasta-com-originais>
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const src = process.argv[2] || '/mnt/user-data/uploads';
const out = path.join(__dirname, '..', 'public', 'images', 'palestras');
const map = {
  'IMG_7122.jpeg': 'david-alves-palestra-tela-nome',
  'IMG_7123.jpeg': 'david-alves-palestra-slide-visagismo',
};

(async () => {
  fs.mkdirSync(out, { recursive: true });

  for (const [file, name] of Object.entries(map)) {
    const input = path.join(src, file);
    if (!fs.existsSync(input)) {
      console.warn(`Arquivo não encontrado: ${input}`);
      continue;
    }

    const img = sharp(input).rotate();
    const meta = await img.metadata();

    for (const width of [1600, 800]) {
      const resizedWidth = Math.min(width, meta.width);
      await img.clone().resize({ width: resizedWidth }).webp({ quality: 78 }).toFile(path.join(out, `${name}-${width}.webp`));
    }

    console.log(`${name}: ${meta.width}x${meta.height}`);
  }
})().catch((error) => {
  console.error('Não foi possível preparar as imagens:', error);
  process.exitCode = 1;
});
