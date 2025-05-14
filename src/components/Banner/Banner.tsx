export default function Banner() {
  const config = require(
    `../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  if (!config || !config.banner) return null;

  return (
    <div className="bg-yellow-200 shadow py-4 px-4 text-black font-bold">
      <div className="max-w-screen-lg mx-auto md:flex md:justify-between items-center">
        <div className="mb-4 md:mb-0">{config.banner}</div>
        {config.bannerLink && (
          <a
            href={config.bannerLink}
            className="bg-mid-green rounded-md shadow hover:bg-light-green hover:text-white flex justify-start text-white content-center h-12 py-3 px-5 relative"
          >
            Support
          </a>
        )}
      </div>
    </div>
  );
}
