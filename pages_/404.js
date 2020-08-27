import Trans from "next-translate/Trans";
import DynamicNamespaces from "next-translate/DynamicNamespaces";
import Logo from "components/Logo/Logo";
import React from "react";
import Link from "next-translate/Link";

const Custom404 = () => (
    <DynamicNamespaces
        dynamic={(lang, ns) => {
            let folder = (lang != "") ? lang : "en";
            return import(`../locales/${folder}/${ns}.json`).then((m) => m.default);
        }}
        namespaces={["common"]}
        fallback="Loading..."
    >
        <div className="error">

            <div className="header">
                <Logo/>
                <h1>
                    <Link href="/">
                        <a>
                            <Trans i18nKey="common:title"/>
                        </a>
                    </Link>
                </h1>
                <h2><Link href="/"><a><Trans i18nKey="common:subtitle"/></a></Link></h2>
            </div>

            <div className="content">
            <h3>Whoops - Error 404</h3>
            <section>
                <p>We bumped into a wall on the circuit...</p>
                <p>Help us into the pits, by letting us know on <a
                    href="https://twitter.com/intent/tweet?text=%40f1cal%20I%20spotted%20an%20issue...">Twitter</a>.</p>
                <p><Link href="/"><a>Return to our homepage</a></Link></p>
            </section>
            </div>
        </div>

        <style jsx>{`
            
            .error {
            	text-align:center;
            	padding:50px 0;
            }
            
            .header {
                margin: 50px 0;
            }
            
            .content {
                margin:45px 0;
            }
          

h1 {
font-size: 16px;
margin: 0;
padding-top: 8px;
font-family: "LeagueSpartan";
text-transform: uppercase;
letter-spacing: 3px;
}

h1 a {
color: #ffffff;
}

h2 {
font-size: 11px;
color: #33a789;
text-transform: uppercase;
margin: 0;
letter-spacing: 2px;
font-size: 11px;
font-family: "LeagueSpartan";
}

h2 a {
color: #33a789;
}
            
					.button {
						background: #1a8b73;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px;
						font-size:15px;
						border:0;
						color:#fff;
						cursor: pointer;
					}
			    `}</style>
    </DynamicNamespaces>
);

export default Custom404;