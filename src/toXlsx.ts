import fs from 'fs';
import XLSX from 'xlsx';

const convert = (source: string, destination: string | undefined) => {
  console.log('Starting conversion, press CTRL-C to exit.');
  const target = destination ?? source.replace('.json', '.xlsx');
  fs.readFile(source, { encoding: 'utf8' }, (err, data) => {
    if (err) return console.warn(`Ignoring ${source}, not found.`);
    try {
      const jsonLibrary = JSON.parse(data);
      const xlsxLibrary = Object.entries(jsonLibrary).map(
        ([key, translations]) => {
          const mapped = { term: key };
          Object.entries(translations as String).map(([lang, value]) => {
            (mapped as any)[lang] = value;
          });
          return mapped;
        },
      );
      const worksheet = XLSX.utils.json_to_sheet(xlsxLibrary);
      const workbook = XLSX.utils.book_new();
      workbook.SheetNames.push('i18n');
      workbook.Sheets['i18n'] = worksheet;
      XLSX.writeFile(workbook, target);
      console.log(`Created ${target} from JSON.`);
    } catch (error) {
      console.error(error);
    }
  });
};

export const toXlsx = (source: string, destination: string | undefined) => {
  convert(source, destination);
  fs.watchFile(source, () => {
    convert(source, destination);
  });
};
