const Footer = () => (
  <footer className="footer">
    <p className="support">
      <a target="_blank" href="https://www.buymeacoffee.com/f1cal">
        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy us a coffee" height="25" />
        <span>Support F1 Calendar, buy us a coffee.</span>
      </a>
    </p>

  	<p className="attribute">&copy; <a href="https://andydev.co.uk" rel="author developer">Andrew Yates</a>, <a href="https://andyhiggs.uk/" rel="author designer">Andy Higgs</a>, <a href="https://sijobling.com" rel="author developer">Si Jobling</a> &amp; <a href="http://abitgone.co.uk/" rel="author">Ant Williams</a> 2020</p>
  	<p>We’re on <a href="https://twitter.com/f1cal" className="twitter">Twitter</a> · Open Sourced on <a href="https://github.com/sportstimes/f1">GitHub</a> · Spotted an issue? <a href="https://twitter.com/intent/tweet?text=%40f1cal%20I%20spotted%20an%20issue...">Report</a></p>
  	<p>Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.</p>
	<style jsx>{`
		.footer {
			margin: 75px 16px 20px 16px;
		}
		
		.support {
  	  	margin: 0 16px 25px 16px;
		}
		.support a {
  		padding:13px 15px;
  		background:#f87639;
  		-webkit-border-radius: 4px;
			-moz-border-radius: 4px;
			font-family: 'LeagueSpartan';
			line-height:25px;
		}
		.support a:hover {
  		opacity: 0.85 !important;
		}
  		
		.support img {
  	  margin-right:10px;
  	  padding-bottom:1px;
  	  vertical-align:middle;
		}
		
		p { color: #aaa; font-size:12px; text-align:center; }
		p a { color: #fff; text-decoration:none; }
	`}</style>
  </footer>
);

export default Footer;