'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CalendarIcon from '../Icons/CalendarIcon';
import ChevronRightIcon from '../Icons/ChevronRightIcon';
import EmailIcon from '../Icons/EmailIcon';
import NotificationIcon from '../Icons/NotificationIcon';
import CoffeeIcon from '../Icons/CoffeeIcon';
import { useLocale, useTranslations } from 'next-intl';

const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

const CTABar = () => {
  const [supportsWebPush, setSupportsWebPush] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
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
  }, []);

  return (
    <div className={`grid grid-col-1 md:flex pt-4 gap-3 gap-y-2`}>
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
            <span className="visible md:hidden">
              {t('options.notifications')}
            </span>
            <ChevronRightIcon className="visible md:hidden absolute right-3 top-4" />
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

      <div className="h-12 grow md:hidden">
        <a
          href="https://www.buymeacoffee.com/f1cal"
          locale={locale as any}
          className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start content-center h-12 py-3 pl-12 relative"
        >
          <CoffeeIcon className="absolute left-3.5 self-center" />
          {t('footer.coffee')}
          <ChevronRightIcon className="absolute right-3 top-4" />
        </a>
      </div>
    </div>
  );
};

export default CTABar;
