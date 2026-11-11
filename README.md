# ValariFlow marketing website

An isolated Astro static website. The SaaS backend and frontend are separate applications.

**Public review preview authorized by the operator; final product/legal launch is not approved.** Legal identity, retention/deletion operations and contractual terms are not yet confirmed. The supplied logo and contact `valariflow@gmail.com` are included with operator authorization. The visible review notice, draft legal status and indexing blocks must remain for the preview.

## Run locally

Use Node 24 and npm. From this directory:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run dev
```

Open `http://localhost:4321/valariflow-website/` (the server prints its exact local URL). To inspect the static production build:

```sh
npm run build
npm test
npm run preview -- --port 4321
```

The wrapper disables Astro build-time telemetry. Astro 6.4.8 is pinned because the preparation host blocks Astro 7's native compiler. No application environment files, databases or credentials are required.

## Content and routes

- `src/data/site.mjs`: public contact, proposed hostname/base path, navigation and approved product copy.
- `src/pages/index.astro`: homepage.
- `src/pages/[page].astro`: features, solutions, pricing, how it works, demo, sales, about and legal layouts.
- `src/data/legal.json`: legal drafts. Resolve all `[CONFIRM]` details and verify the deletion process before publication. A contact email alone does not establish fulfillment capability.
- `src/data/posts.mjs` and `src/pages/blog/`: educational articles. Add a post to the structured list; routes and sitemap are generated from it.
- `src/layouts/Layout.astro`: shared navigation, footer, canonical, Open Graph and structured data.
- `src/components/LeadForm.astro`: email-draft helper, no backend submission or browser storage. Without JavaScript the submit button stays disabled and a direct email link remains available.
- `public/valariflow-logo.jpeg`: original operator-supplied brand image, preserved without alteration. It also supplies the social-sharing image.

The product-interface preview is explicitly conceptual and uses fictional data. No verified product screenshot was available in the inspected workspace. Current campaigns are described as preview-only. No testimonials, customer counts, Meta partnership, certification or production-readiness claims are made.

## Ads and conversion hooks

The demo, sales and solutions pages provide focused landing-page structures. CTAs have `data-conversion` attributes for a future reviewed event map. They do not emit events or load trackers. Email preparation is not lead delivery. Any later analytics or ad pixels require separate approval, appropriate notices/controls and verified event semantics. Avoid putting personal information in URLs or analytics events. The site does not persist UTM parameters or form data.

## Public source boundary

`public-source-files.json` is the exact proposed standalone repository manifest. Run `node scripts/source-boundary.mjs` before copying or pushing. Copy only those files into a fresh repository: never copy the SaaS repository history, parent directories, environment files, dependencies, private reports or local test output. The build emits a separate `dist/` payload for Pages.

## Publication, after approval

Dedicated review-preview repository: `Garykumanan/valariflow-website`. The operator has authorized hosting the website publicly in a separate repository to review it, while keeping the SaaS product private. `reviewDeploymentApproved` allows that reviewed preview through the deployment gate; it does not approve final legal content or remove indexing blocks.

1. Finalize operator identity, legal copy, deletion fulfillment and commercial terms. Review the final logo usage and marketing copy.
2. Obtain explicit approval for the exact repository and source manifest. Confirm the actual public origin/base in `src/data/site.mjs`.
3. Only after that approval, set `publicationApproved` and `legalApproved` to `true`. Remove/rewrite draft notices and placeholder legal text, including references to the draft privacy policy in forms. Run publication checks, build, source checks and tests.
4. Create a new public repository containing only the reviewed manifest. Do not change the main SaaS repository visibility.
5. In the dedicated repository, configure Settings → Pages → GitHub Actions and the `github-pages` environment. Manually run the included `Publish ValariFlow marketing` workflow. It rejects unapproved or unfinished content and uploads only `dist/`.
6. Enforce HTTPS and verify all actual public routes, final canonical URLs, metadata, sitemap, form/email links and mobile layout. GitHub Pages serves `robots.txt` at the repository subpath for project sites; the root hostname's robots policy remains outside this repository's control.

Review site URL: `https://garykumanan.github.io/valariflow-website/`. Refer to the deployment result for live verification. Draft legal pages must not be submitted as finalized Meta app documents.

For a later custom domain, approve DNS and hosting changes separately, set the final `origin` and `base`, rebuild and recheck all links/canonicals. Avoid parallel indexed copies. After launch, verify the appropriate Search Console property, submit the final sitemap and review indexing and content quality. No domain purchase, tracking or external submission is performed by this project.
