import React from "react";
import withTranslation from 'next-translate/withTranslation'
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import SiteSelector from "../../components/SiteSelector/SiteSelector";
import {usePlausible} from "next-plausible";
import type { I18n } from 'next-translate'
import EmailIcon from '../Icons/EmailIcon'

interface Props {
	i18n: I18n;
}

class Footer extends React.Component<Props> {
	
	constructor(props) {
		super(props);
		this.state = {
		  showHomeScreenPrompt: false
		};
	}
	
	componentDidMount() {
		var standalone = "standalone" in window.navigator && window.navigator.standalone;
		var iOS = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
		var prompt = window.localStorage.a2hs_message;
			
		if (iOS && !standalone && !prompt) {
			this.setState({ showHomeScreenPrompt: true })
		}
	}
	
	dismissPrompt = () => {
		localStorage.setItem("a2hs_message", true);
		this.setState({ showHomeScreenPrompt: false })
	};
	
	render() {
		const { t, lang } = this.props.i18n
		
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
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4 px-2 text-center md:text-left">
						<div>
							<p className="text-base text-gray-400 mb-2">
								&copy; {new Date().getFullYear()}{" "}
								<a
									href="https://andydev.co.uk"
									rel="author developer"
									className="text-gray-300"
								>
									Andrew Yates
								</a>
								,&nbsp;
								<a
									href="https://andyhiggs.uk/"
									rel="author designer"
									className="text-gray-300"
								>
									Andy Higgs
								</a>
								,&nbsp;
								<a
									href="https://sijobling.com"
									rel="author developer"
									className="text-gray-300"
								>
									Si Jobling
								</a>{" "}
							</p>
							
							<p className="text-base text-gray-400 text-xs px-2 md:px-0">
								{t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.footnote`)}
							</p>
							
						</div>
						
						
						<div className="flex justify-center md:justify-end space-x-6 pt-2">
							<a
								href="https://twitter.com/f1cal"
								className="text-gray-400 hover:text-gray-500"
							>
								<span className="sr-only">Twitter</span>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
							
							<a href="https://www.andydev.co.uk/contact" className="text-gray-400 hover:text-gray-500">
								<span className="sr-only">Email</span>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
								fill="currentColor" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
							</a>
							
							
						</div>
					</div>
					
					
					<div className="max-w-7xl mx-auto overflow-hidden pb-8 pt-2">
						
						<p className="text-center mt-8">
							<a
								href="https://vercel.com?utm_source=sportstimes"
								onClick={() => {
									const plausible = usePlausible();
									plausible("Visit Vercel")
								}}
							>
								<svg
									className="inline"
									fill="none"
									height="30"
									viewBox="0 0 212 44"
									width="212"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect fill="#000" height="44" rx="8" width="212">
										<title>Powered by Vercel</title>
									</rect>
									<path
										d="m60.4375 15.2266v11.2734h1.4063v-4.0234h2.8359c2.1172 0 3.625-1.4922 3.625-3.6016 0-2.1484-1.4766-3.6484-3.6094-3.6484zm1.4063 1.25h2.4843c1.6328 0 2.5313.8515 2.5313 2.3984 0 1.4922-.9297 2.3516-2.5313 2.3516h-2.4843zm11.5003 10.1718c2.3984 0 3.8828-1.6562 3.8828-4.3593 0-2.711-1.4844-4.3594-3.8828-4.3594-2.3985 0-3.8828 1.6484-3.8828 4.3594 0 2.7031 1.4843 4.3593 3.8828 4.3593zm0-1.2109c-1.5938 0-2.4922-1.1563-2.4922-3.1484 0-2 .8984-3.1485 2.4922-3.1485 1.5937 0 2.4922 1.1485 2.4922 3.1485 0 1.9921-.8985 3.1484-2.4922 3.1484zm15.9534-7.3594h-1.3516l-1.6562 6.7344h-.125l-1.8828-6.7344h-1.2891l-1.8828 6.7344h-.125l-1.6562-6.7344h-1.3594l2.3594 8.4219h1.3593l1.875-6.5156h.125l1.8828 6.5156h1.3672zm4.5238 1.0391c1.3359 0 2.2265.9844 2.2578 2.4766h-4.6407c.1016-1.4922 1.0391-2.4766 2.3829-2.4766zm2.2187 5.2031c-.3516.7422-1.0859 1.1406-2.1719 1.1406-1.4297 0-2.3593-1.0547-2.4297-2.7187v-.0625h6.0547v-.5156c0-2.6172-1.3828-4.2344-3.6562-4.2344-2.3125 0-3.7969 1.7187-3.7969 4.3672 0 2.664 1.4609 4.3515 3.7969 4.3515 1.8437 0 3.1562-.8906 3.5469-2.3281zm3.2425 2.1797h1.3435v-5.2188c0-1.1874.93-2.0468 2.211-2.0468.266 0 .75.0468.86.0781v-1.3437c-.172-.0235-.454-.0391-.672-.0391-1.117 0-2.086.5781-2.336 1.3984h-.125v-1.25h-1.2815zm8.8985-7.3828c1.336 0 2.227.9844 2.258 2.4766h-4.641c.102-1.4922 1.04-2.4766 2.383-2.4766zm2.219 5.2031c-.352.7422-1.086 1.1406-2.172 1.1406-1.43 0-2.359-1.0547-2.43-2.7187v-.0625h6.055v-.5156c0-2.6172-1.383-4.2344-3.656-4.2344-2.313 0-3.797 1.7187-3.797 4.3672 0 2.664 1.461 4.3515 3.797 4.3515 1.844 0 3.156-.8906 3.547-2.3281zm6.36 2.3281c1.164 0 2.164-.5546 2.695-1.4922h.125v1.3438h1.281v-11.7656h-1.343v4.6718h-.118c-.476-.9218-1.468-1.4765-2.64-1.4765-2.141 0-3.539 1.7187-3.539 4.3594 0 2.6484 1.382 4.3593 3.539 4.3593zm.312-7.5078c1.524 0 2.477 1.2188 2.477 3.1485 0 1.9453-.946 3.1484-2.477 3.1484-1.539 0-2.461-1.1797-2.461-3.1484 0-1.961.93-3.1485 2.461-3.1485zm14.462 7.5078c2.133 0 3.531-1.7265 3.531-4.3593 0-2.6485-1.391-4.3594-3.531-4.3594-1.156 0-2.18.5703-2.641 1.4765h-.125v-4.6718h-1.344v11.7656h1.282v-1.3438h.125c.531.9376 1.531 1.4922 2.703 1.4922zm-.313-7.5078c1.539 0 2.453 1.1797 2.453 3.1485 0 1.9687-.914 3.1484-2.453 3.1484-1.531 0-2.484-1.2031-2.484-3.1484s.953-3.1485 2.484-3.1485zm6.04 10.4063c1.492 0 2.164-.5781 2.882-2.5313l3.29-8.9375h-1.43l-2.305 6.9297h-.125l-2.312-6.9297h-1.453l3.117 8.4297-.157.5c-.351 1.0156-.773 1.3828-1.546 1.3828-.188 0-.399-.0078-.563-.039v1.1484c.188.0312.422.0469.602.0469zm17.391-3.0469 3.898-11.2734h-2.148l-2.813 8.9218h-.132l-2.836-8.9218h-2.227l3.938 11.2734zm8.016-7.1797c1.164 0 1.93.8125 1.969 2.0781h-4.024c.086-1.25.899-2.0781 2.055-2.0781zm1.984 4.8281c-.281.6328-.945.9844-1.906.9844-1.273 0-2.094-.8906-2.141-2.3125v-.1015h5.969v-.625c0-2.6954-1.461-4.3126-3.898-4.3126-2.477 0-4.016 1.7266-4.016 4.4766s1.516 4.4141 4.031 4.4141c2.016 0 3.446-.9688 3.797-2.5235zm3.547 2.3516h1.938v-4.9375c0-1.1953.875-1.9766 2.133-1.9766.328 0 .843.0547.992.1094v-1.7969c-.18-.0546-.524-.0859-.805-.0859-1.101 0-2.023.625-2.258 1.4687h-.132v-1.3281h-1.868zm13.501-5.6719c-.203-1.7969-1.532-3.0469-3.727-3.0469-2.57 0-4.078 1.6485-4.078 4.4219 0 2.8125 1.516 4.4688 4.086 4.4688 2.164 0 3.508-1.2031 3.719-2.9922h-1.844c-.203.8906-.875 1.3672-1.883 1.3672-1.32 0-2.117-1.0469-2.117-2.8438 0-1.7734.789-2.7969 2.117-2.7969 1.063 0 1.703.5938 1.883 1.4219zm5.117-1.5078c1.164 0 1.93.8125 1.969 2.0781h-4.024c.086-1.25.899-2.0781 2.055-2.0781zm1.985 4.8281c-.282.6328-.946.9844-1.907.9844-1.273 0-2.093-.8906-2.14-2.3125v-.1015h5.968v-.625c0-2.6954-1.461-4.3126-3.898-4.3126-2.477 0-4.016 1.7266-4.016 4.4766s1.516 4.4141 4.032 4.4141c2.015 0 3.445-.9688 3.796-2.5235zm3.625 2.3516h1.937v-11.8516h-1.937z"
										fill="#fff"
									/>
									<path d="m23.3248 13 9.3249 16h-18.6497z" fill="#fff" />
									<path d="m43.5 0v44" stroke="#5e5e5e" />
								</svg>
							</a>
						</p>
					</div>
				</footer>
				
				{ this.state.showHomeScreenPrompt && (
					<div class="relative z-99999" aria-labelledby="modal-title" role="dialog" aria-modal="true">
						<div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>
						
					  	<div class="fixed inset-0 z-10 overflow-y-auto">
							<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						  	<div class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div class="sm:flex sm:items-start">
							  	<div class="mt-2 text-center sm:mt-0 sm:text-left">
									<div class="mt-2">
								  	<p class="text-sm text-gray-500 mb-4">Install F1 Calendar on your device: tap share and &quot;Add to Home Screen&quot;.</p>
									</div>
							  	</div>
								</div>
								<div class="mt-5 sm:mt-4">
							  	<button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm" onClick={this.dismissPrompt}>Got it</button>
								</div>
						  	</div>
							</div>
					  	</div>
					</div>
				)}
			</>
		);
  	}
}

export default withTranslation(Footer);
