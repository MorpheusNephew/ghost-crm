import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { openApiDocument } from './document';

const outputPath = resolve(import.meta.dirname, '../../openapi.json');

await writeFile(outputPath, `${JSON.stringify(openApiDocument, null, 2)}\n`);
console.info(`Generated OpenAPI document at ${outputPath}`);
