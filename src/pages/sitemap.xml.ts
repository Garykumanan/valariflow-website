import { absolute } from '../data/site.mjs';
import { posts } from '../data/posts.mjs';
const routes = ['', 'features/', 'solutions/', 'pricing/', 'how-it-works/', 'request-demo/', 'contact-sales/', 'about/', 'blog/', 'privacy-policy/', 'terms-of-service/', 'data-deletion/', ...posts.map(p=>`blog/${p.slug}/`)];
export function GET() {
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(path=>`<url><loc>${absolute(path)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
