// Static Vercel boss-demo deployment mode. There is no live Promptfoo backend in this environment.
export const IS_STATIC_HOSTED_DEMO = import.meta.env.VITE_IS_HOSTED === 'true';

// Behavior varies depending on whether the app is running as a static HTML app on the user's local machine.
export const IS_RUNNING_LOCALLY = !IS_STATIC_HOSTED_DEMO;

// Metadata keys that should be hidden from the user in the UI
export const HIDDEN_METADATA_KEYS = ['citations', '_promptfooFileMetadata'];
