import { Packer } from "docx";
import * as docx from 'docx'


// TODO: Terminar de implementar el documento - https://docxjs-editor.vercel.app/playground/
export async function downloadDocument() {
  const doc = new docx.Document({
    numbering:{
      config: [
        {
          reference: "my-numbering",
          levels: [
            {
              level: 0,
              text: "%1",
            },
          ],
        },
      ],
    },
    sections: [
      {
        headers: {
          default: new docx.Header({
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.RIGHT,
                children: [
                  new docx.TextRun('Solicitud de revisión - Avaluo Catastral - Matricula Inmobiliaria XXXXX'),
                ],
              }),
            ],
          }),
        },
        children: [
          new docx.Paragraph({
            children: [
              new docx.TextRun({text: 'Mosquera, Cundinamarca. 22 de agosto de 2026', break: 2}),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({text: 'Señores', break: 1}),
              new docx.TextRun({text: 'Instituto Geografico Agustin Codazzi', break: 2, bold: true}),
              new docx.TextRun({text: 'contactenos@igac.gov.co', break: 1}),
            ],
          }),
          new docx.Paragraph({
            children: [
              new docx.TextRun({text: 'Actuación Previa. ', break: 2,  bold: true}),
              new docx.TextRun({text: 'Impuesto predial con Matricula Inmobiliaria XXXXXXX'}),
            ],
          }),

          new docx.Paragraph({
            children: [
              new docx.TextRun({text: 'Andres Felipe Tovar Ochoa', break: 2, bold: true}),
              new docx.TextRun({text: ', mayor de edad identificado con la cedula de ciudadania 1073247534, '}),
              new docx.TextRun({text: 'actuando con plena capacidad legal, me dirijo de la manera mas respetuosa en el ejercicio del derecho consagrado en el Artículo 23 superior y desarrollado por la Ley 1755 de 2015, para presentar este DERECHO DE PETICIÓN, con el animo de que me sean atendidas las siguientes'}),
            ],
          }),

          new docx.Paragraph({
            children: [
              new docx.TextRun({text: 'PETICIONES', break: 2, bold: true}),
              new docx.TextRun({text: 'Primera peticion', break: 2}),
              new docx.TextRun({text: 'Segunda peticion', break: 2}),
            ],
          }),
          
        ],
      },
      {
        properties: {
          page: {
            pageNumbers: {
              start: 1,
              separator: docx.PageNumberSeparator.EM_DASH,
            },
          },
        },
        headers: {
          default: new docx.Header({
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.RIGHT,
                children: [
                  new docx.TextRun('My Title '),
                  new docx.TextRun({
                    children: ['Page ', docx.PageNumber.CURRENT],
                  }),
                ],
              }),
            ],
          }),
          first: new docx.Header({
            children: [
              new docx.Paragraph({
                alignment: docx.AlignmentType.RIGHT,
                children: [
                  new docx.TextRun('First Page Header of Second section'),
                  new docx.TextRun({
                    children: ['Page ', docx.PageNumber.CURRENT],
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new docx.Paragraph({
            children: [new docx.TextRun('Third Page'), new docx.PageBreak()],
          }),
          new docx.Paragraph('Fourth Page'),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "mi-documento.docx";

  link.click();

  URL.revokeObjectURL(url);
}