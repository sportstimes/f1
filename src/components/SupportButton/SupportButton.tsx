'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import usePlausible from 'next-plausible';
import Image from 'next/image';

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
      <Image
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        width="15"
        height="15"
        className="mr-2"
        alt="buymeacoffee"
      />

      {t('footer.coffee')}
    </a>
  );
};

export default SupportButton;
