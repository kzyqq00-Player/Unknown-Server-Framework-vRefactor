const childProcess = require('node:child_process');
const archiver = require('archiver');
const fs = require("node:fs");
const path = require("node:path");

console.log('[USFv4 BUILDER INFO] TypeScript Compiler output:', childProcess.execSync('npx tsc'));
console.log('[USFv4 BUILDER INFO] Webpack output:', childProcess.execSync('npx webpack'));

const stream = fs.createWriteStream(
    path.join(
        process.cwd(),
        'build/Unknown Server Framework vRefactor.mcpack'
    )
);
const archive = archiver('zip', { zlib: { level: 9 } });
archive.pipe(stream);

archive.file('manifest.json', { name: 'manifest.json' });
archive.file('pack_icon.png', { name: 'pack_icon.png' });
archive.directory('dist/webpack/scripts', 'scripts');

archive.on('finish', () => {
    console.log('[USFv4 BUILDER INFO] Build successfully!');
});
archive.finalize();