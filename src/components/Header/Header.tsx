import React from "react";
import Logo from "../Logo/Logo";
import {useTranslations} from 'next-intl';
// import i18nConfig from "../../i18n.js";
import Link from "next/link";
import usePlausible from "next-plausible";
import Image from 'next/image';
import CTABar from "../CTABar/CTABar";
import SupportButton from "../SupportButton/SupportButton";

const Header = ({ year, showCTABar }) => {
	const t = useTranslations('All');
	const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}.title`);
	const subtitle = t(`${process.env.NEXT_PUBLIC_SITE_KEY}.subtitle`);

	return (
		<div className="w-full bg-dark-green mb-4">
			<header className="max-w-screen-lg mx-auto font-sans px-2 py-4">
				<div className="flex md:justify-between">
					<div className="flex flex-col md:flex-row justify-center items-center md:justify-between w-screen md:w-auto mb-4">
						<Link href="/" className="" style={{width: "60px"}} title={title}>
							<Logo style={{width: "60px"}}  />
						</Link>	
						
						<div className="text-center md:text-left uppercase mt-4 md:mt-0 md:ml-4">
							<h1 className="mb-1 text-lg tracking-wider">
								<Link href="/" title={title} className="text-white hover:text-white font-bold text-xl"
									>
									{title}&nbsp;
									{year && (
										<span>{year}</span>
									)}
								</Link>
							</h1>
							<h2 className="text-sm font-normal tracking-wider">
								<Link href="/" title={title} className="text-light-green hover:text-light-green">
									{subtitle}
								</Link>
							</h2>
						</div>
					</div>
					
					<div className="hidden md:inline-block">
						<SupportButton />
					</div>
				</div>
				{showCTABar && <CTABar />}
			</header>
		</div>
	);
};

export default Header;