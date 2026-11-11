import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { site } from '../src/data/site.mjs';
if(site.reviewDeploymentApproved && !site.publicationApproved){
 assert(!site.legalApproved,'Review deployment must retain draft legal status');
 const layout=readFileSync(new URL('../src/layouts/Layout.astro',import.meta.url),'utf8');
 assert(layout.includes('Website preview for review')&&layout.includes('noindex, nofollow'),'Review notice and indexing block are required');
 console.log('Review-only deployment authorized: draft legal pages, visible review notice and indexing blocks retained. Final launch remains unapproved.');
 process.exit(0);
}
assert(site.publicationApproved, 'PUBLICATION BLOCKED: explicit approval for exact repository and content is pending.');
assert(site.legalApproved, 'PUBLICATION BLOCKED: legal and operational decisions are pending.');
assert(!JSON.stringify(site).includes('[CONFIRM'),'Resolve operator identity and effective date');
const legal=readFileSync(new URL('../src/data/legal.json',import.meta.url),'utf8');
assert(!/\[CONFIRM|Draft for operator review|awaiting.*confirm|Proposed process|subject to operator confirmation|not finalized contractual terms/i.test(legal),'Finalize legal copy and verified deletion procedure');
console.log('Publication configuration checks passed. Operator approval must be independently recorded before repository creation/push.');
