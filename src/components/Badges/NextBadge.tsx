import React, {useState} from "react";
import {useTranslations} from 'next-intl';

interface Props {
	mobileOnly?: boolean;
}

const NextBadge: FunctionComponent<Props> = ({ mobileOnly }: Props) => {
	const t = useTranslations('All');

	return (
		<span className={`bg-yellow-500 rounded px-1 md:px-2 py-1 text-xsm text-black font-bold ml-2 ${mobileOnly ? "display sm:hidden" : ""}`}>
			{t(`badges.next`)}
		</span>
	);
}

export default NextBadge;