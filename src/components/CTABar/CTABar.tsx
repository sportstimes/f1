'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import CalendarIcon from '../Icons/CalendarIcon';
import ChevronRightIcon from '../Icons/ChevronRightIcon';
import EmailIcon from '../Icons/EmailIcon';
import NotificationIcon from '../Icons/NotificationIcon';
import CoffeeIcon from '../Icons/CoffeeIcon';
import MenuIcon from '../Icons/MenuIcon';
import CloseIcon from '../Icons/CloseIcon';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import SiteSelector from '../SiteSelector/SiteSelector';
import YearSelector from '../YearSelector/YearSelector';

const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

// Mobile hamburger menu button component - placed in header top-left
export const MobileMenuButton = () => {
  const [supportsWebPush, setSupportsWebPush] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations('All');
  const locale = useLocale();

  useEffect(() => {
    let installed = false;

    if (window.navigator.standalone) {
      installed = true;
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
      installed = true;
    }

    if ('Notification' in window) {
      setSupportsWebPush(true);
      setIsInstalled(installed);
    }

    setIsHydrated(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Show skeleton while hydrating
  if (!isHydrated) {
    return (
      <div className="bg-mid-green rounded-md shadow h-12 w-12 animate-pulse"></div>
    );
  }

  const menuItems = (
    <>
      {!isInstalled && (
        <Link
          href="/generate"
          locale={locale as any}
          className="hover:bg-light-green hover:text-white flex items-center h-14 py-3 pl-14 relative border-b border-white/10"
          onClick={() => setMenuOpen(false)}
        >
          <CalendarIcon className="absolute left-4 self-center" />
          {t('options.calendar')}
        </Link>
      )}
      {!isInstalled && config.supportsEmailReminders > 0 && (
        <Link
          href="/subscribe"
          locale={locale as any}
          className="hover:bg-light-green hover:text-white flex items-center h-14 py-3 pl-14 relative border-b border-white/10"
          onClick={() => setMenuOpen(false)}
        >
          <EmailIcon className="absolute left-4 self-center" />
          {t('options.email')}
        </Link>
      )}
      {config.supportsWebPush > 0 && supportsWebPush && (
        <Link
          href="/notifications"
          locale={locale as any}
          className="hover:bg-light-green hover:text-white flex items-center h-14 py-3 pl-14 relative border-b border-white/10"
          onClick={() => setMenuOpen(false)}
        >
          <NotificationIcon className="absolute left-4 self-center" />
          {t('options.notifications')}
        </Link>
      )}
      <a
        href="https://www.buymeacoffee.com/f1cal"
        className="hover:bg-light-green hover:text-white flex items-center h-14 py-3 pl-14 relative"
        onClick={() => setMenuOpen(false)}
      >
        <CoffeeIcon className="absolute left-4 self-center" />
        {t('footer.coffee')}
      </a>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-mid-green rounded-md shadow hover:bg-light-green h-12 w-12 flex items-center justify-center relative z-50"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-dark-green z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 flex-shrink-0">
          <span className="text-white font-semibold">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="h-10 w-10 flex items-center justify-center hover:bg-light-green rounded-md"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex flex-col flex-grow overflow-y-auto">
          {menuItems}
        </nav>

        {/* Selectors section - pinned to bottom */}
        <div className="px-4 border-t border-white/10 pt-4 pb-4 space-y-3 flex-shrink-0">
          <SiteSelector />
          <YearSelector />
          <LanguageSelector />
        </div>
      </div>
    </>
  );
};

// Desktop CTA bar - only shown on desktop
const CTABar = () => {
  const [supportsWebPush, setSupportsWebPush] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const t = useTranslations('All');
  const locale = useLocale();

  useEffect(() => {
    let installed = false;

    if (window.navigator.standalone) {
      installed = true;
    } else if (window.matchMedia('(display-mode: standalone)').matches) {
      installed = true;
    }

    if ('Notification' in window) {
      setSupportsWebPush(true);
      setIsInstalled(installed);
    }

    setIsHydrated(true);
  }, []);

  // Show skeleton while hydrating to prevent CLS
  if (!isHydrated) {
    return (
      <div className="hidden md:flex pt-4 gap-3 gap-y-2">
        <div className="h-12 grow">
          <div className="bg-mid-green rounded-md shadow h-12 animate-pulse"></div>
        </div>
        {config.supportsEmailReminders > 0 && (
          <div className="h-12 grow">
            <div className="bg-mid-green rounded-md shadow h-12 animate-pulse"></div>
          </div>
        )}
        {config.supportsWebPush > 0 && (
          <div className="h-12">
            <div className="bg-mid-green rounded-md shadow h-12 w-12 animate-pulse"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden md:flex pt-4 gap-3 gap-y-2">
      {!isInstalled && (
        <div className="h-12 grow">
          <Link
            href="/generate"
            locale={locale as any}
            className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative"
          >
            {t('options.calendar')}
            <CalendarIcon className="absolute left-3 self-center" />
            <ChevronRightIcon className="absolute right-3 top-4" />
          </Link>
        </div>
      )}
      {!isInstalled && config.supportsEmailReminders > 0 && (
        <div className="h-12 grow">
          <Link
            href="/subscribe"
            locale={locale as any}
            className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative"
          >
            {t('options.email')}
            <EmailIcon className="absolute left-3 self-center" />
            <ChevronRightIcon className="absolute right-3 top-4" />
          </Link>
        </div>
      )}
      {config.supportsWebPush > 0 && supportsWebPush && !isInstalled && (
        <div className="h-12">
          <Link
            href="/notifications"
            locale={locale as any}
            className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative"
            title={t('options.notifications')}
          >
            <NotificationIcon className="absolute left-3.5 self-center" />
          </Link>
        </div>
      )}

      {config.supportsWebPush > 0 && supportsWebPush && isInstalled && (
        <div className="h-12 grow">
          <Link
            href="/notifications"
            locale={locale as any}
            className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative"
          >
            <NotificationIcon className="absolute left-3.5 self-center" />
            {t('options.notifications')}
            <ChevronRightIcon className="absolute right-3 top-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CTABar;
