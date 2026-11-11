import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { site, absolute } from '../src/data/site.mjs';
import { posts } from '../src/data/posts.mjs';

const root = fileURLToPath(new URL('../dist', import.meta.url));
assert(existsSync(root), 'Run npm run build first');
const routes = ['', 'features/', 'solutions/', 'pricing/', 'how-it-works/', 'request-demo/', 'contact-sales/', 'about/', 'blog/', 'privacy-policy/', 'terms-of-service/', 'data-deletion/', ...posts.map(p=>`blog/${p.slug}/`)];
const walk = dir => readdirSync(dir).flatMap(name => { const p=join(dir,name); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root);
const titles = new Set();
let links = 0;
function elements(node, out=[]) { if(node.tagName) out.push(node); for(const child of node.childNodes || []) elements(child,out); return out; }
const attrs = node => Object.fromEntries((node.attrs || []).map(a=>[a.name,a.value]));
const textContent = node => (node.value || '') + (node.childNodes || []).map(textContent).join('');
function localTarget(value, current) {
 const u=new URL(value,current);
 if (u.protocol === 'mailto:') { assert.equal(u.pathname,site.email); return; }
 assert.equal(u.origin,site.origin,`Unexpected external resource/link: ${value}`);
 assert(u.pathname.startsWith(site.base+'/'),`Subpath escape: ${value}`);
 let target=resolve(root, decodeURIComponent(u.pathname.slice(site.base.length+1)));
 assert(target.startsWith(root), 'Path escape');
 if(existsSync(target) && statSync(target).isDirectory()) target=join(target,'index.html');
 assert(existsSync(target),`Broken target: ${value}`);
 if (u.hash && target.endsWith('.html')) {
   const nodes=elements(parse(readFileSync(target,'utf8')));
   assert(nodes.some(n=>attrs(n).id===decodeURIComponent(u.hash.slice(1))),`Missing fragment ${value}`);
 }
 links++;
}
for (const route of routes) {
 const file=join(root,route,'index.html');
 const source=readFileSync(file,'utf8');
 const errors=[];
 const doc=parse(source,{onParseError:e=>errors.push(e.code)});
 assert.equal(errors.length,0,`${route}: HTML parse errors ${errors.join(',')}`);
 const nodes=elements(doc);
 const tags=tag=>nodes.filter(n=>n.tagName===tag);
 for(const tag of ['html','head','body','title','h1','main','header','footer']) assert.equal(tags(tag).length,1,`${route}: ${tag}`);
 const title=textContent(tags('title')[0]);
 assert(!titles.has(title),`Duplicate title: ${title}`); titles.add(title);
 assert.equal(attrs(tags('html')[0]).lang,'en-IN');
 assert(nodes.some(n=>n.tagName==='meta'&&attrs(n).name==='description'&&attrs(n).content.length>40));
 assert(nodes.some(n=>n.tagName==='link'&&attrs(n).rel==='canonical'&&attrs(n).href===absolute(route)),`Canonical ${route}`);
 for(const property of ['og:title','og:description','og:url','og:image']) assert(nodes.some(n=>n.tagName==='meta'&&attrs(n).property===property));
 for(const img of tags('img')) { const a=attrs(img); assert(a.alt&&a.width&&a.height,'Image semantics and dimensions'); }
 const ids=nodes.map(n=>attrs(n).id).filter(Boolean); assert.equal(ids.length,new Set(ids).size,'Duplicate IDs');
 for(const n of nodes) {
   const a=attrs(n);
   if(a.href) localTarget(a.href,absolute(route));
   if(a.src) localTarget(a.src,absolute(route));
   if(n.tagName==='script') {
     if(a.type==='application/ld+json') JSON.parse(textContent(n));
     else assert(a.type==='module'&&['request-demo/','contact-sales/'].includes(route),'Unexpected JavaScript');
   }
 }
 const forms=tags('form');
 assert.equal(forms.length,['request-demo/','contact-sales/'].includes(route)?1:0);
 for(const form of forms) assert(!attrs(form).action,'No network form endpoint expected');
 if(!site.publicationApproved) assert(source.includes('noindex, nofollow'));
 else assert(!/\[CONFIRM|Draft for operator review|draft privacy policy|noindex, nofollow/.test(source),`Unfinished public content: ${route}`);
 if(site.reviewDeploymentApproved&&!site.publicationApproved) assert(source.includes('Website preview for review'),'Review deployment notice is required');
}
const sitemap=readFileSync(join(root,'sitemap.xml'),'utf8');
const sitemapURLs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(sitemapURLs.length,routes.length);
assert.equal(new Set(sitemapURLs).size,routes.length);
for(const route of routes) assert(sitemapURLs.includes(absolute(route)));
const robots=readFileSync(join(root,'robots.txt'),'utf8');
assert(robots.includes(`Sitemap: ${absolute('sitemap.xml')}`));
assert(robots.includes(site.publicationApproved?'Allow: /':'Disallow: /'));
let bytes=0;
for(const file of files) {
 const name=relative(root,file).replaceAll('\\','/');
 assert(!/(\.env|\.db$|\.sqlite|\.map$|\.csv$|\.git\/|security|backup|\.py$|package-lock)/i.test(name),`Forbidden output: ${name}`);
 bytes+=statSync(file).size;
 if(!name.endsWith('.jpeg')) {
   const data=readFileSync(file,'utf8');
   assert(!/-----BEGIN .*PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|\b[a-fA-F0-9]{64}\b|postgres(?:ql)?:\/\/[^\s]+@/.test(data),`Secret pattern: ${name}`);
   assert(!/https?:\/\/(?:localhost|127\.0\.0\.1)|D:\\ValariFlow|C:\\Users/i.test(data),`Internal address in output: ${name}`);
   assert(!/googletagmanager|google-analytics|connect\.facebook\.net|fbq\(|gtag\(/.test(data),`Unapproved tracker: ${name}`);
 }
}
assert(bytes<700_000,`Unexpected static payload size: ${bytes}`);
console.log(`PASS: ${routes.length} content routes, ${files.length} static files, ${links} local links/assets; HTML parsing, semantics, metadata, canonical URLs, sitemap, subpaths, no trackers and output secret-pattern checks. Total ${bytes} bytes.`);
console.log('Draft legal placeholders and indexing blocks are expected until operator approval. Pattern scanning does not establish security certification.');
