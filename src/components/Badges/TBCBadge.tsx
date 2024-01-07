import React, {useState} from "react";
import {useTranslations} from 'next-intl';

interface Props {
	mobileOnly?: boolean;
}

const TBCBadge: FunctionComponent<Props> = ({ mobileOnly }: Props) => {
	const t = useTranslations('All');

	return (
		<span title={t(`badges.tbc`)} className={`bg-yellow-400 rounded px-1 md:px-2 py-1 text-xsm text-black font-bold ml-2 ${mobileOnly ? "display sm:hidden" : ""}`}>
			{t(`badges.tbc`)}
		</span>
	);
}

export default TBCBadge;