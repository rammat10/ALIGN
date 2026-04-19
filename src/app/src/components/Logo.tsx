import logoPanda from '@app/assets/logo.svg';
import { APP_BRAND_FULL_NAME } from '@app/lib/branding';
import { Link } from 'react-router-dom';

import './Logo.css';

export default function Logo() {
  return (
    <Link to="/" className="inline-flex items-center px-2 py-1 no-underline perspective-[2000px]">
      <img
        src={logoPanda}
        alt={`${APP_BRAND_FULL_NAME} Logo`}
        className="logo-icon w-[25px] h-auto transition-all duration-1000 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
      />
      <span className="logo-text ml-2 max-w-[24rem] font-['Inter',sans-serif] text-sm font-semibold text-foreground tracking-[0.02em] transition-all duration-300">
        {APP_BRAND_FULL_NAME}
      </span>
    </Link>
  );
}
