import Projects from '@/components/projects';
import MaskedImage from '@/components/ui/maskedImage';
import Highlight from '@/components/ui/highlight';

const svgMask = `
<svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 0H0V70C0 97.6142 22.3858 120 50 120C77.6142 120 100 97.6142 100 70V0Z" fill="#D9D9D9"/>
</svg>
`;

export default function Home() {
  return (
    <>
      <div className="col-span-7 lg:col-start-2 ">
        <div className="flex justify-between">
          <span>Good Morning! </span>
          <span>Available</span>
        </div>
        <div className="flex justify-between my-40">
          <h1 className="text-4xl text-text/60">
            Paul Hanaoka is a <br />
            <Highlight word="designer" hoverContent="designer" /> with a passion
            for building <br />
            <Highlight
              word="high-quality"
              hoverContent="Beautiful and useful"
            />{' '}
            <Highlight
              word="products"
              hoverContent="mostly software, but sometimes websites, homes, cabinets, and anything else that needs building"
            />{' '}
            and doing
            <br />
            other stuff good too.
          </h1>
          <MaskedImage
            svgPath={svgMask}
            imageSrc="/images/tiny-dank-guy.png"
            width="300px"
            height="300px"
          />
        </div>
      </div>
      <div className="col-span-4 lg:col-start-2">
        <Projects variant="random" />
      </div>
    </>
  );
}
