import React, {useState} from "react"

interface Props {
	mobileOnly?: boolean;
}

const CanceledBadge: FunctionComponent<Props> = ({ mobileOnly }: Props) => {
	const t = useTranslations('All');

	return (
		<span className={`bg-red-600 rounded px-1 md:px-2 py-1 text-xsm text-black font-bold uppercase ml-2 ${mobileOnly ? "display sm:hidden" : ""}`}>
			{t(`badges.canceled`)}
		</span>
	);
}

export default CanceledBadge;