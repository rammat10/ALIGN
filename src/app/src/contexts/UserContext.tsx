import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { IS_STATIC_HOSTED_DEMO } from '@app/constants';
import { fetchUserEmail } from '@app/utils/api';
import { UserContext } from './UserContextDef';

export function UserProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (IS_STATIC_HOSTED_DEMO) {
      setIsLoading(false);
      return;
    }

    const loadUserEmail = async () => {
      const userEmail = await fetchUserEmail();
      setEmail(userEmail);
      setIsLoading(false);
    };

    loadUserEmail();
  }, []);

  const value = useMemo(() => ({ email, setEmail, isLoading }), [email, isLoading]);

  return <UserContext value={value}>{children}</UserContext>;
}
