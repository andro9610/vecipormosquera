const fs = require('fs');
const JSZip = require('jszip');
const path = 'src/docs/Solicitud_Revision.docx';
const buffer = fs.readFileSync(path);
JSZip.loadAsync(buffer).then((zip) => {
    const names = Object.keys(zip.files).filter((n) => !zip.files[n].dir && (n.endsWith('.xml') || n.endsWith('.rels') || n.endsWith('.vml')));
    return Promise.all(names.map(async (name) => {
        const text = await zip.files[name].async('string');
        if (text.includes('Nombre') || text.includes('Solicitante') || text.includes('{{') || text.includes('}}')) {
            console.log('FILE', name);
            const idx = Math.max(text.indexOf('Nombre'), text.indexOf('Solicitante'), text.indexOf('{{'));
            if (idx >= 0) {
                console.log(text.slice(Math.max(0, idx - 200), idx + 400));
            }
            console.log('---');
        }
    }));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
