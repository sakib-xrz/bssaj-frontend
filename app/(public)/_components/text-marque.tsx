const marqueeText = "Bangladesh Student Support Association Japan • ";

const ScrollingTextMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-blue-500 py-3">
      <div className="marquee flex whitespace-nowrap animate-marquee text-white text-lg font-semibold tracking-wide">
        <span className="mx-4">{marqueeText.repeat(10)}</span>
      </div>
    </div>
  );
};

export default ScrollingTextMarquee;
