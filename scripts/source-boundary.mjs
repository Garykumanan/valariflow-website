import { readdirSync, readFileSync, lstatSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative, sep } from 'node:path';
import assert from 'node:assert/strict';
const root=realpathSync(fileURLToPath(new URL('../',import.meta.url)));
export const approvedFiles=JSON.parse(readFileSync(join(root,'public-source-files.json'),'utf8'));
const ignored=new Set(['.git','node_modules','dist','.astro','test-results']);
function walk(dir){return readdirSync(dir).flatMap(n=>{if(dir===root&&ignored.has(n))return [];const p=join(dir,n);const s=lstatSync(p);assert(!s.isSymbolicLink(),`No symlinks: ${p}`);assert(realpathSync(p).startsWith(root+sep),`Path escape: ${p}`);return s.isDirectory()?walk(p):[relative(root,p).replaceAll('\\','/')];});}
const actual=walk(root).sort();
assert.deepEqual(actual,[...approvedFiles].sort(),'Source differs from the exact reviewed file manifest');
for(const name of approvedFiles){
 assert(!/\.env|\.db$|\.sqlite|\.csv$|\.py$|credentials|secrets|security-report/i.test(name),`Private file type: ${name}`);
 if(!name.endsWith('.jpeg')){
   const text=readFileSync(join(root,name),'utf8');
   assert(!/-----BEGIN (?:RSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|\b[a-fA-F0-9]{64}\b|postgres(?:ql)?:\/\/[^\s]+@/.test(text),`Secret pattern: ${name}`);
 }
}
console.log(`PASS: ${approvedFiles.length} allowlisted source files; no symlinks, forbidden private files or secret-pattern matches.`);
