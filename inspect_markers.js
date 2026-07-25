const fs = require('fs');
const JSZip = require('jszip');
const path = 'src/docs/Solicitud_Revision.docx';
const buffer = fs.readFileSync(path);
JSZip.loadAsync(buffer).then(async (zip) => {
    const file = zip.file('word/document.xml');
    const text = await file.async('string');
    const markers = ['Nombre_Solicitante', 'Genero_Verbo', 'Cedula_Solicitante', 'Direccion_Solicitante', 'Celular_Solicitante', 'Correo_Solicitante', 'Actuacion_Previa', 'Peticiones_Solicitud', 'Hechos_Solicitud'];
    for (const marker of markers) {
        const idx = text.indexOf(marker);
        console.log(marker, idx);
        if (idx >= 0) {
            console.log(text.slice(Math.max(0, idx - 100), idx + 200));
            console.log('---');
        }
    }
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
