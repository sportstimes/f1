'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import usePlausible from 'next-plausible';
import CoffeeIcon from '../Icons/CoffeeIcon';

const SupportButton = () => {
  const t = useTranslations('All');

  return (
    <a
      href="https://www.buymeacoffee.com/f1cal"
      className="support-btn mt-3"
      onClick={() => {
        // const plausible = usePlausible();
        //
        // plausible("Support", {
        // 	props: {
        // 		buttonId: "header"
        // 	}
        // })
      }}
    >
      <CoffeeIcon className="mr-2" />

      {t('footer.coffee')}
    </a>
  );
};

export default SupportButton;
