import fs from 'fs';
import XLSX from 'xlsx';

const convert = (source: string, destination: string | undefined) => {
  console.log('Starting conversion, press CTRL-C to exit.');
  const target = destination ?? source.replace('.xlsx', '.json');
  fs.readFile(source, (err, data) => {
    if (err) return console.warn(`Ignoring ${source}, not found.`);
    try {
      const workbook = XLSX.read(data, { type: 'buffer' });
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const xlsxLibrary: { [key: string]: string }[] =
        XLSX.utils.sheet_to_json(worksheet);
      const jsonLibrary: { [key: string]: { [key: string]: string } } = {};

      xlsxLibrary.forEach(({ term, ...translations }) => {
        jsonLibrary[term] = translations;
      });

      fs.writeFile(
        target,
        JSON.stringify(jsonLibrary, null, 2),
        { encoding: 'utf8' },
        (err) => {
          if (err) console.error(err);
          console.log(`Created ${target} from XLSX.`);
        },
      );
    } catch (error) {
      console.error(error);
    }
  });
};

export const fromXlsx = (source: string, destination: string | undefined) => {
  convert(source, destination);
  fs.watchFile(source, () => {
    convert(source, destination);
  });
};
