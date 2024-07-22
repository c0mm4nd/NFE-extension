// 请帮我实现一个插件对网页植入的元素：
// 1. 默认是一个NFE图标按钮，贴边悬浮在页面左下角边上，鼠标掠过会凸显
// 2. 点击按钮后，会在页面中央弹出一个侧边栏，侧边栏标题是“Non-Fungible Enthusiast Recommendations”，副标题“powered by Web3Research”
// 3. 卡片中有8个卡片，每个卡片包含一个被推荐的NFT item
import { useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@workspace/components/ui/sheet';
import { Button } from '@workspace/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@workspace/components/ui/card';

interface NFTItemCardProps {
  collectionName: string;
  collectionDescription: string;
  itemID: string;
  itemDescription: string;
  image: string;
  price: string;
  buyUrl: string;
}

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function NFTItemCard(props: NFTItemCardProps) {
  return (
    <Card className="bg-zinc-800 rounded-md">
      <div className="py-2 px-2">
        <div className="space-x-2 flex">
          <div>
            <img src={props.image} width={512} height={125} alt="NFT Image" className="rounded-md" />
          </div>
          <div className="space-y-2 max-x-[8rem]">
            <CardTitle>
              {props.collectionName} <code>#{props.itemID.split('/')[1]}</code>
            </CardTitle>
            <CardDescription>{props.collectionDescription}</CardDescription>
            <p className="text-sm text-muted-foreground">{props.itemDescription}</p>

            <div className="flex justify-between ">
              <div></div>
              <a href={props.buyUrl} className="text-primary">
                <Button className="space-x-2">
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span>{props.price}</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface RecommendationProps {
  wallet: string;
  platform: string;
}

export default function Recommendation(props: RecommendationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shrink, setShrink] = useState(true);

  const [suggestedNFTs, setSuggestedNFTs] = useState<NFTItemCardProps[]>([
    {
      collectionName: 'CryptoPunks',
      collectionDescription:
        '10,000 unique pixel art characters with proof of ownership stored on the Ethereum blockchain.',
      itemID: '0x0483b0dfc6c78062b9e999a82ffb795925381415/405',
      itemDescription:
        'CryptoPunks are a collection of 10,000 unique pixel art characters with proof of ownership stored on the Ethereum blockchain.',
      image: 'https://i.seadn.io/s/raw/files/f3564ef33373939b024fb791f21ec37b.png?auto=format&dpr=1&w=640',
      price: '0.69 ETH',
      buyUrl:
        props.platform === 'opensea'
          ? 'https://opensea.io/assets/ethereum/0x0483b0dfc6c78062b9e999a82ffb795925381415/405'
          : 'https://blur.io/eth/asset/0x0483b0dfc6c78062b9e999a82ffb795925381415/405',
    },
    {
      collectionName: 'Bored Ape Yacht Club',
      collectionDescription: '10,000 unique Bored Ape NFTs with proof of ownership stored on the Ethereum blockchain.',
      itemID: '0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
      itemDescription:
        'Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs with proof of ownership stored on the Ethereum blockchain.',
      image: 'https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/127-1cafa3ac3af82a3a?w=1024',
      price: '0.69 ETH',
      buyUrl:
        props.platform === 'opensea'
          ? 'https://opensea.io/assets/ethereum/0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405'
          : 'https://blur.io/eth/asset/0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
    },
    {
      collectionName: 'Pudgy Penguins',
      collectionDescription:
        '10,000 unique Pudgy Penguin NFTs with proof of ownership stored on the Ethereum blockchain.',
      itemID: '0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
      itemDescription:
        'Pudgy Penguins are a collection of 10,000 unique Pudgy Penguin NFTs with proof of ownership stored on the Ethereum blockchain.',
      image: 'https://i.seadn.io/gcs/files/382f58322af33054cdab993172439576.png?auto=format&dpr=1&w=640',
      price: '0.69 ETH',
      buyUrl: 'https://opensea.io/assets/ethereum/0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
    },
    {
      collectionName: 'Pudgy Penguins',
      collectionDescription:
        '10,000 unique Pudgy Penguin NFTs with proof of ownership stored on the Ethereum blockchain.',
      itemID: '0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
      itemDescription:
        'Pudgy Penguins are a collection of 10,000 unique Pudgy Penguin NFTs with proof of ownership stored on the Ethereum blockchain.',
      image: 'https://i.seadn.io/gcs/files/7fe8c3a87d8f70a1514437503eb183ef.png?auto=format&dpr=1&w=640',
      price: '0.69 ETH',
      buyUrl: 'https://opensea.io/assets/ethereum/0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
    },
    {
      collectionName: 'Bored Ape Yacht Club',
      collectionDescription: '10,000 unique Bored Ape NFTs with proof of ownership stored on the Ethereum blockchain.',
      itemID: '0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
      itemDescription:
        'Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs with proof of ownership stored on the Ethereum blockchain.',
      image:
        'https://i.seadn.io/gae/Ubd8CiIXf3urnLeMD-a_GZ11gOgq-curEtBAqIckEGzmnBlBicGYj9uLxT_EH1dtIRYCmd4_miRLXndWyJPmzi8O-uazFUW5DgnZOA4?auto=format&dpr=1&w=640',
      price: '0.69 ETH',
      buyUrl:
        props.platform === 'opensea'
          ? 'https://opensea.io/assets/ethereum/0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405'
          : 'https://blur.io/eth/asset/0x60ec7b8b1a6b42c7e5a8f0a3f5f9f0e3b8b1b3b1/405',
    },
  ]);

  return (
    <div className="text-white">
      <div className="fixed top-12 right-0 inline-block">
        <div
          className={`font-mono transform transition-transform ease-in-out duration-300 bg-blue-700 rounded-l-full py-1 pl-4 pr-1 cursor-pointer transition-all duration-500 ease-in-out`}
          onMouseEnter={() => {
            // setOpen(true);
            setShrink(false);
          }}
          onClick={() => {
            setIsOpen(true);
          }}
          onMouseLeave={() => {
            setShrink(true);
          }}>
          <span style={{ display: 'inline-block' }}>N</span>
          <span
            className={`inline-block transition-all duration-500 ease-in-out`}
            style={{
              maxWidth: shrink ? '0' : '100px', // Adjust 100px based on the actual width of 'nthusiast'
              opacity: shrink ? 0 : 1,
            }}>
            on-
          </span>
          <span style={{ display: 'inline-block' }}>F</span>
          <span
            className={`inline-block transition-all duration-500 ease-in-out`}
            style={{
              maxWidth: shrink ? '0' : '100px', // Adjust 100px based on the actual width of 'nthusiast'
              opacity: shrink ? 0 : 1,
            }}>
            ungible&nbsp;
          </span>
          <span className="inline-block transition-all duration-500 ease-in-out`">E</span>
          <span
            className={`inline-block transition-all duration-500 ease-in-out`}
            style={{
              maxWidth: shrink ? '0' : '100px', // Adjust 100px based on the actual width of 'nthusiast'
              opacity: shrink ? 0 : 1,
            }}>
            nthusiast
          </span>
        </div>
      </div>

      <div
        className={`fixed right-0 top-0 bottom-0 w-[36rem] h-full transform transition-transform ease-in-out duration-300 ${
          isOpen ? 'translate-x-0 ' : 'translate-x-full'
        }`}
        onMouseLeave={() => {
          setIsOpen(false);
        }}>
        <div className="flex flex-col justify-between w-[8rem] sm:w-full h-full bg-zinc-800/90">
          <div className="bg-primary text-primary-foreground px-6 pt-2 flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Non-Fungible Enthusiast</h2>
              <p className="text-sm text-primary-foreground/80">
                Personalized recommendation for {shortenAddress(props.wallet)}
              </p>
            </div>
            <div>
              <Button size="icon" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
          <div className="px-6 py-2 grid gap-6 overflow-y-auto h-full">
            {suggestedNFTs.map((nft, index) => (
              <NFTItemCard key={index} {...nft} />
            ))}

            <p className="text-sm text-center center">Loading more...</p>
          </div>
          <div>
            <p className="text-sm text-center center">
              powered by <a href="http://web3resear.ch">Web3Resear.ch</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThumbsUpIcon(props) {
  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 512 512">
      <g>
        <path
          d="M34.044,278.031c-0.641-0.516-1.531-0.594-2.266-0.234c-0.734,0.391-1.172,1.172-1.109,2l3.219,50.547
		c0.078,0.891-0.453,1.719-1.297,2.063L1.326,344.828c-0.719,0.297-1.219,0.953-1.313,1.703c-0.078,0.766,0.266,1.516,0.891,1.953
		l83.922,50.922c0.578,0.406,1.328,0.484,1.969,0.203c0.672-0.266,1.141-0.859,1.266-1.563l12.641-71.875
		c0.141-0.75-0.156-1.5-0.734-1.984L34.044,278.031z"
        />
        <path
          d="M479.419,332.406c-0.828-0.344-1.359-1.172-1.313-2.063l3.25-50.547c0.047-0.828-0.391-1.609-1.125-2
		c-0.734-0.359-1.625-0.281-2.266,0.234l-65.922,46.156c-0.578,0.484-0.875,1.234-0.734,1.984l12.656,71.875
		c0.109,0.703,0.578,1.297,1.234,1.563c0.672,0.281,1.406,0.203,2-0.203l83.906-50.922c0.641-0.438,0.969-1.188,0.875-1.953
		c-0.078-0.75-0.578-1.406-1.281-1.703L479.419,332.406z"
        />
        <path
          d="M255.998,392.469c-48.422,0-94.266-11.25-135.109-31.203l-13.156,74.75
		c45.609,19.281,95.719,29.953,148.266,29.953s102.672-10.672,148.281-29.953l-13.172-74.75
		C350.294,381.219,304.451,392.469,255.998,392.469z"
        />
        <polygon
          points="74.873,186.625 81.388,199.797 95.919,201.906 85.404,212.156 87.873,226.641 74.873,219.797 
		61.873,226.641 64.357,212.156 53.826,201.906 68.373,199.797 	"
        />
        <polygon
          points="137.373,82.578 143.873,95.75 158.419,97.859 147.888,108.109 150.373,122.594 137.373,115.766 
		124.357,122.594 126.857,108.109 116.326,97.859 130.873,95.75 	"
        />
        <polygon
          points="437.138,186.625 430.638,199.797 416.106,201.906 426.622,212.156 424.138,226.641 437.138,219.797 
		450.153,226.641 447.669,212.156 458.185,201.906 443.638,199.797 	"
        />
        <polygon
          points="374.654,82.578 368.154,95.75 353.607,97.859 364.123,108.109 361.654,122.594 374.654,115.766 
		387.653,122.594 385.169,108.109 395.7,97.859 381.154,95.75 	"
        />
        <polygon
          points="251.498,46.031 257.998,59.203 272.544,61.328 262.013,71.578 264.498,86.063 251.498,79.219 
		238.498,86.063 240.982,71.578 230.451,61.328 244.998,59.203 	"
        />
        <path
          d="M236.091,129.266c3.344-6.766,10.219-11.047,17.75-11.047c7.547,0,14.438,4.281,17.766,11.047l19.703,39.922
		c2.891,5.844,8.469,9.906,14.906,10.844l44.063,6.391c7.469,1.094,13.672,6.313,16,13.484s0.391,15.031-5.016,20.297
		l-31.875,31.078c-4.672,4.547-6.797,11.109-5.703,17.531l7.531,43.891c1.266,7.422-1.781,14.922-7.875,19.359
		c-6.109,4.438-14.188,5.016-20.859,1.5l-39.422-20.719c-5.766-3.031-12.656-3.031-18.422,0l-39.406,20.719
		c-6.688,3.516-14.75,2.938-20.875-1.5c-6.094-4.438-9.141-11.938-7.875-19.359l7.531-43.891c1.109-6.422-1.031-12.984-5.688-17.531
		l-31.891-31.078c-5.391-5.266-7.328-13.125-5-20.297s8.531-12.391,15.984-13.484l44.063-6.391c6.438-0.938,12.031-5,14.906-10.844
		L236.091,129.266z"
        />
      </g>
    </svg>
  );
}

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
