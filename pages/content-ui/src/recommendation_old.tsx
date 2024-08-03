import { SVGProps, useEffect } from 'react';
import { Button } from '@workspace/components/ui/button';

function RecCard() {
  return (
    <div className="flex-none w-[280px] sm:w-[340px] md:w-[400px] snap-center">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img
          src="https://generated.vusercontent.net/placeholder.svg"
          alt="Card Image"
          width={400}
          height={240}
          className="w-full h-[240px] object-cover"
        />
        <div className="p-4 bg-background">
          <h3 className="text-lg font-semibold">Card Title</h3>
          <p className="text-muted-foreground text-sm">This is a brief description of the card.</p>
        </div>
      </div>
    </div>
  );
}

function ChevronLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Recommendation() {
  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  const name = 'Non-Fungible Enthusiast Recommendations';
  const cards = [{}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div className="flex flex-col justify-center px-4 sm:px-8 xxl:px-16 mx-auto w-full max-w-[2560px] overflow-x-hidden">
      <div className="w-full ml-auto mr-auto max-w-screen-xl mx-auto py-8 md:py-12">
        <div className="flex justify-between mb-6 ">
          <span
            className="font-semibold text-2xl"
            data-id="TextHeading"
            data-relingo-block="true"
            data-relin-paragraph="64">
            {name}
          </span>
        </div>
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide flex gap-4 snap-x snap-mandatory">
            {cards.map((_, index) => (
              <RecCard key={index} />
            ))}
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <Button variant="ghost" size="sm">
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <Button variant="ghost" size="sm">
              <ChevronRightIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
