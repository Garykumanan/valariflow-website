// Public information only. Review publication decisions in docs/marketing/.
export const site = {
  name: 'ValariFlow',
  origin: 'https://garykumanan.github.io',
  base: '/valariflow-website',
  email: 'valariflow@gmail.com',
  publicationApproved: false,
  reviewDeploymentApproved: true,
  legalApproved: false,
  operator: '[CONFIRM: legal operator name and postal address]',
  effectiveDate: '[CONFIRM: effective date]',
};
export const url = (path = '') => `${site.base}/${path.replace(/^\/+/, '')}`;
export const absolute = (path = '') => new URL(url(path), site.origin).href;
export const navigation = [['Features', 'features/'], ['Solutions', 'solutions/'], ['How it works', 'how-it-works/'], ['Pricing', 'pricing/']];
export const features = [
  { number: '01', title: 'Keep conversations in context', text: 'Review conversations, message history and team assignments in a workspace built around your business.', icon: 'inbox' },
  { number: '02', title: 'Give your contacts a home', text: 'Import contacts, review details and record customer opt-ins and opt-outs. Importing a list does not create consent.', icon: 'contacts' },
  { number: '03', title: 'Map your next conversation', text: 'Build guided workflows and test sample conversations before deciding how they should run.', icon: 'flow' },
  { number: '04', title: 'Work together, with clear roles', text: 'Use workspace memberships and roles to manage who can view information and make changes.', icon: 'team' },
  { number: '05', title: 'Preview before you broadcast', text: 'Prepare recipients and personalized content. Current broadcasts are previews, not live bulk delivery.', icon: 'campaign' },
  { number: '06', title: 'Understand your workspace credits', text: 'Review recorded subscriptions, credit entries and reservations. Meta fees and sending permissions are separate.', icon: 'chart' },
];
export const solutions = [
  { title: 'Retail & local shops', eyebrow: 'From questions to clearer next steps', text: 'Organize enquiries about products, availability and order updates. Explore a workflow for the questions your team hears every day.', examples: ['Product enquiries', 'Store information', 'Follow-up planning'] },
  { title: 'Service businesses', eyebrow: 'A little more order in your day', text: 'Keep service enquiries together and make the next handoff easier to understand. Plan responses to common questions before putting a workflow to work.', examples: ['Service questions', 'Team handoffs', 'Appointment enquiries'] },
  { title: 'Growing teams', eyebrow: 'Keep the context as your team grows', text: 'Give teammates appropriate access to a shared business workspace. Review conversation history and agree on a consistent way to help customers.', examples: ['Shared workspaces', 'Role-based access', 'Conversation history'] },
];
export const faqs = [
  ['What is ValariFlow?', 'ValariFlow is a B2B messaging and workflow product designed for small and medium businesses. It brings contact management, conversations and workflow tools into a business workspace.'],
  ['Can I connect WhatsApp, Instagram and Facebook?', 'The implementation supports Meta account integrations. Availability depends on configuration, permissions, provider requirements and approval. A demo can help establish what is available for your business.'],
  ['Are broadcasts ready for live sending?', 'Current broadcasts are preview-only. You can review recipients and personalized content, but a preview is not a sent or delivered campaign.'],
  ['Is ValariFlow an official Meta partner?', 'No official partnership or Meta approval is claimed. Publishing this website does not grant App Review approval or permission to onboard customer accounts.'],
  ['Do I need technical experience?', 'The interface includes guided workflow tools and business-focused screens. Use a demo to explore the steps with your own business needs in mind.'],
  ['How much does it cost?', 'Public pricing has not been finalized. Contact sales to discuss your workspace, team and intended use. No checkout or automatic payment is offered on this website.'],
];
