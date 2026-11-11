import { site, absolute } from '../data/site.mjs';
export function GET() {
 return new Response(`User-agent: *\n${site.publicationApproved ? 'Allow: /' : 'Disallow: /'}\nSitemap: ${absolute('sitemap.xml')}\n`, { headers:{'Content-Type':'text/plain; charset=utf-8'} });
}
