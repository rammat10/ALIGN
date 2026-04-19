import Navigation from '@app/components/Navigation';
import { PostHogProvider } from '@app/components/PostHogProvider';
import UpdateBanner from '@app/components/UpdateBanner';
import { IS_STATIC_HOSTED_DEMO } from '@app/constants';
import { Outlet } from 'react-router-dom';
import { PostHogPageViewTracker } from './PostHogPageViewTracker';

function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default function PageShell() {
  if (IS_STATIC_HOSTED_DEMO) {
    return (
      <Layout>
        <Navigation />
        <Outlet />
      </Layout>
    );
  }

  return (
    <PostHogProvider>
      <Layout>
        <Navigation />
        <UpdateBanner />
        <Outlet />
        <PostHogPageViewTracker />
      </Layout>
    </PostHogProvider>
  );
}
