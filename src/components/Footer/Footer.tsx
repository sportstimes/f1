'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SiteSelector from '../../components/SiteSelector/SiteSelector';
import YearSelector from '../../components/YearSelector/YearSelector';
//import {usePlausible} from "next-plausible";
import EmailIcon from '../Icons/EmailIcon';
import SupportButton from '../SupportButton/SupportButton';
import Link from 'next/link';

const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

const Footer = () => {
  const t = useTranslations('All');

  const [showHomeScreenPrompt, setShowHomeScreenPrompt] = useState(false);

  useEffect(() => {
    var standalone =
      'standalone' in window.navigator && window.navigator.standalone;
    var iOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    var prompt = window.localStorage.a2hs_message;

    if (iOS && !standalone && !prompt && config.supportsWebPush) {
      setShowHomeScreenPrompt(true);
    }
  }, []);

  const dismissPrompt = () => {
    localStorage.setItem('a2hs_message', true);
    setShowHomeScreenPrompt(false);
  };

  return (
    <>
      <footer className="max-w-screen-lg mx-auto mt-2 md:mt-10 px-0 sm:px-2">
        <div className="max-w-7xl mx-auto overflow-hidden md:hidden">
          <div className="mt-1 mb-6 flex justify-center space-x-6">
            <LanguageSelector />
          </div>

          <div className="mt-1 mb-6 flex justify-center space-x-6">
            <SiteSelector />
          </div>

          <div className="mt-1 mb-6 flex justify-center space-x-6">
            <YearSelector />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4 px-2 text-center md:text-left">
          <div>
            <div className="flex justify-center md:justify-start space-x-4 pb-4">
              <a
                href="https://bsky.app/profile/f1calendar.com"
                rel="me"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Bluesky</span>

                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z" />
                </svg>
              </a>

              <a
                href="https://www.threads.net/@f1calendarapp"
                rel="me"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Threads</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8c29.2 14.1 50.6 35.2 61.8 61.4c15.7 36.5 17.2 95.8-30.3 143.2c-36.2 36.2-80.3 52.5-142.6 53h-.3c-70.2-.5-124.1-24.1-160.4-70.2c-32.3-41-48.9-98.1-49.5-169.6V256v-.2C17 184.3 33.6 127.2 65.9 86.2C102.2 40.1 156.2 16.5 226.4 16h.3c70.3 .5 124.9 24 162.3 69.9c18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4c-29.2-35.8-73-54.2-130.5-54.6c-57 .5-100.1 18.8-128.2 54.4C72.1 146.1 58.5 194.3 58 256c.5 61.7 14.1 109.9 40.3 143.3c28 35.6 71.2 53.9 128.2 54.4c51.4-.4 85.4-12.6 113.7-40.9c32.3-32.2 31.7-71.8 21.4-95.9c-6.1-14.2-17.1-26-31.9-34.9c-3.7 26.9-11.8 48.3-24.7 64.8c-17.1 21.8-41.4 33.6-72.7 35.3c-23.6 1.3-46.3-4.4-63.9-16c-20.8-13.8-33-34.8-34.3-59.3c-2.5-48.3 35.7-83 95.2-86.4c21.1-1.2 40.9-.3 59.2 2.8c-2.4-14.8-7.3-26.6-14.6-35.2c-10-11.7-25.6-17.7-46.2-17.8H227c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1h.8c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3c25.6-1.4 54.6-11.4 59.5-73.2c-13.2-2.9-27.8-4.4-43.4-4.4c-4.8 0-9.6 .1-14.4 .4c-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z" />
                </svg>
              </a>
              <a
                href="https://mastodon.social/@f1cal"
                rel="me"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Mastodon</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.1964 9.59515C23.1964 4.388 19.7834 2.86122 19.7834 2.86122C16.4341 1.32372 7.53907 1.33979 4.22193 2.86122C4.22193 2.86122 0.808359 4.388 0.808359 9.59515C0.808359 15.7934 0.454788 23.4916 6.46711 25.0826C8.63729 25.6559 10.5021 25.7791 12.0026 25.6934C14.7246 25.5434 16.2519 24.7237 16.2519 24.7237L16.1609 22.7469C16.1609 22.7469 14.2157 23.3576 12.0294 23.288C9.86461 23.213 7.583 23.0523 7.22782 20.3951C7.19489 20.1483 7.17878 19.8995 7.17961 19.6505C11.7669 20.7701 15.6787 20.138 16.7555 20.0094C19.7619 19.6505 22.3805 17.7969 22.7143 16.1041C23.2393 13.4362 23.1964 9.59515 23.1964 9.59515ZM19.1721 16.3023H16.6741V10.1844C16.6741 7.52193 13.2455 7.42015 13.2455 10.5541V13.9023H10.7635V10.5535C10.7635 7.41961 7.33497 7.5214 7.33497 10.1839V16.3018H4.83157C4.83157 9.76068 4.553 8.37854 5.81782 6.92675C7.20532 5.37854 10.0939 5.27675 11.3801 7.25354L12.0016 8.29818L12.623 7.25354C13.9146 5.26604 16.808 5.38925 18.1853 6.92675C19.4555 8.38925 19.171 9.76604 19.171 16.3018L19.1721 16.3023Z" />
                </svg>
              </a>

              <a
                href="http://github.com/sportstimes/f1"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="https://x.com/f1cal"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">X</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                >
                 <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                </svg>
              </a>

              <a
                href="https://www.andydev.co.uk/contact"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Email</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </a>
            </div>

            <p className="text-base text-gray-400 mb-2">
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="https://andydev.co.uk"
                rel="author"
                className="text-gray-300"
              >
                Andrew Yates
              </a>
              ,&nbsp;
              <a
                href="https://andyhiggs.uk/"
                rel="author"
                className="text-gray-300"
              >
                Andy Higgs
              </a>
              ,&nbsp;
              <a
                href="https://sijobling.com"
                rel="author"
                className="text-gray-300"
              >
                Si Jobling
              </a>{' '}
            </p>

            <p className="text-base text-gray-400 text-xsm px-2 md:px-0">
              {t(`${process.env.NEXT_PUBLIC_SITE_KEY}.footnote`)}
            </p>

            <p className="text-base text-gray-400 text-xsm px-2 md:px-0">
              <Link href={`years`}>Years</Link>
              {' • '}
              <Link href={`timezones`}>Timezones</Link>
            </p>
          </div>

          <div>
            <div className="justify-end hidden md:flex">
              <SupportButton />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto overflow-hidden pb-8 pt-2">
          <div className="hidden md:block text-center mt-8">
            <YearSelector />
          </div>
        </div>
      </footer>

      {showHomeScreenPrompt && (
        <div
          className="relative z-99999"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-2 text-center sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-4">
                        {t(`footer.homescreen`)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={dismissPrompt}
                  >
                    Got it
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
