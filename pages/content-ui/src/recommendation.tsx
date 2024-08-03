// 请帮我实现一个插件对网页植入的元素：
// 1. 默认是一个NFE图标按钮，贴边悬浮在页面左下角边上，鼠标掠过会凸显
// 2. 点击按钮后，会在页面中央弹出一个侧边栏，侧边栏标题是“Non-Fungible Enthusiast Recommendations”，副标题“powered by Web3Research”
// 3. 卡片中有8个卡片，每个卡片包含一个被推荐的NFT item
import { SVGProps, useEffect, useState } from 'react';
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

interface NFTItem {
  collectionName: string;
  collectionDescription: string;
  itemID: string;
  itemDescription: string;
  image: string;
  price: string;
}

interface NFTItemCardProps extends NFTItem {
  platform: string;
}

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function NFTItemCard(props: NFTItemCardProps) {
  const buyUrl =
    props.platform === 'opensea'
      ? `https://opensea.io/assets/${props.itemID}`
      : `https://blur.network/eth/asset/${props.itemID}`;

  return (
    <Card className="bg-zinc-800 rounded-md">
      <div className="py-2 px-2">
        <div className="space-x-2 flex">
          <div className="space-y-2 w-1/3">
            <img src={props.image} width={256} height={256} alt="NFT Image" className="rounded-md h-256 w-256" />
          </div>
          <div className="space-y-2 w-2/3">
            <CardTitle>
              {props.collectionName} <code>#{props.itemID.split('/')[1]}</code>
            </CardTitle>
            <CardDescription>{props.collectionDescription}</CardDescription>
            {/* <p className="text-sm text-muted-foreground">{props.itemDescription}</p> */}

            <div className="flex justify-between ">
              <div></div>
              <a href={buyUrl} className="text-primary border-1">
                <Button className="space-x-2">
                  {/* <ShoppingCartIcon className="h-6 w-6" /> */}
                  {props.platform === 'opensea' ? (
                    <img className="h-8" src="https://opensea.io/static/images/logos/opensea-logo.svg"></img>
                  ) : (
                    <img className="h-8" src="https://imgs.blur.io/_assets/homepage/logo.png"></img>
                  )}
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

  const [suggestedNFTs, setSuggestedNFTs] = useState<NFTItem[]>([]);

  useEffect(() => {
    fetch(`https://nfe-api.web3resear.ch:19443/address/${props.wallet}`)
      .then(res => res.json())
      .then(data => {
        console.log('recommendations', data);
        setSuggestedNFTs(data['recommendations']);
      });
  }, []);

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
              <NFTItemCard key={index} platform={props.platform} {...nft} />
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
