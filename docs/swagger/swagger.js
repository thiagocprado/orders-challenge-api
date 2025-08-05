import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, './swagger.json');

const content = await readFile(filePath, 'utf-8');
const swaggerDocument = JSON.parse(content);

export default swaggerDocument;
