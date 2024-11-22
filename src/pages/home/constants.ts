import { OptionType } from "../../sanity";
import AsiaThumb from "./asia-thumb.gif";
import AsiaThumb2 from "./sup.png";
import BabyThumb from "./baby2.gif";
import B2BThumb from "./hek.gif";
import AThumb from "./shark.png";
import AThumb2 from "./shark.gif";
import GridThumb from "./grid3.png";
import Alien from "./alien.gif";
import LightThumb from "./lightning.jpg";
import LightThumb2 from "./lightning2.gif";
import BirdThumb from "./bird.png";
import BirdThumb2 from "./bird2.png";
import MossThumb from "./moss.gif";
import TradeThumb from "./trade.png";
import AppleThumb from "./apple2.jpg";
import MeThumb from "./me.gif";
import ClickThumb from "./click.gif";
import AlmondThumb from "./almond3.png";
import GolfThumb from "./golf.gif";
import GolfThumb2 from "./tv3.png";
import ArtThumb from "./art.gif";
import ForgThumb from "./forg.gif";
import RatThumb from "./rat.png";
import DogThumb from "./dog.png";
import EuroThumb from "./euro.png";
import AmbThumb from "./amb.png";
import PlasThumb from "./plas.gif";
import TracksThumb from "./tracks.png";
import BugThumb from "./hands.png";
import GarThumb from "./gar.gif";
import MoonThumb from "./moon.gif";
import MoonThumb2 from "./god.jpg";
import NYE from "./nye2.png";
import Words from "./words.gif";
import Window from "./window.png";
import WindowBG from "./window-bg.png";
import Desktop from "./desktop.png";
import Sky from "./eye.png";
import Bird from "./bird.jpg";
import Gar from "./gar.png";
import Clock from "./clock.jpg";

export type ImageDefinition = {
  src: string;
  width: number;
  height?: number;
  heightPx?: number;
  left?: number;
  top?: number;
  topPx?: number;
  bottom?: number;
  absolute?: boolean;
  block?: boolean;
  zIndex?: number;
};

export type ItemDefinition = {
  _type: OptionType;
  slug: string;
  title: string;
  description: string;
  images: ImageDefinition[];
};

export const ITEMS: ItemDefinition[] = [
  {
    _type: "film",
    slug: "asia-vlog",
    title: "🇹🇭...🇻🇳...🇯🇵...🇹🇼",
    description:
      "4 countries\n4 vlogs\n4 friends (sometimes less, sometimes more)\n4 billion mopeds",
    images: [
      {
        src: AsiaThumb,
        width: 90,
      },
      {
        src: AsiaThumb2,
        width: 50,
        left: 30,
        topPx: 5,
      },
    ],
  },
  {
    _type: "dj",
    slug: "live-from-babylon",
    title: "transmission from the ether",
    description: "a noisy dubby punky mix\ncool music video too!",
    images: [
      {
        src: BabyThumb,
        width: 100,
        heightPx: 150,
        absolute: true,
        zIndex: 1,
      },
      {
        src: TracksThumb,
        width: 100,
        heightPx: 200,
        left: 0,
      },
    ],
  },
  {
    _type: "dj",
    slug: "housewarming-b2b",
    title: "HOUSEWARMING B2B",
    description: "if u like daft punk...",
    images: [
      {
        src: B2BThumb,
        width: 21,
        left: 39,
        absolute: true,
        zIndex: 1,
      },
      {
        src: GridThumb,
        width: 50,
        left: 25,
      },
    ],
  },
  {
    _type: "dj",
    slug: "aquacore",
    title: "aquacore",
    description: "aquatic jungle mix",
    images: [
      {
        src: AThumb2,
        width: 20,
        left: 40,
      },
      {
        src: AThumb,
        width: 60,
        top: -10,
        left: 5,
        block: true,
      },
    ],
  },
  {
    _type: "dj",
    slug: "beach-thunderstorm",
    title: "beach sunset thunderstorm mix",
    description: "a bit of trip hop",
    images: [
      {
        src: LightThumb,
        width: 60,
        left: 30,
      },
      {
        src: LightThumb2,
        width: 50,
        left: 10,
        top: 10,
        absolute: true,
        zIndex: 1,
      },
    ],
  },
  {
    _type: "film",
    slug: "berlin-birdie",
    title: "berlin birdie",
    description: "birdie",
    images: [
      {
        src: BirdThumb2,
        width: 40,
        left: 10,
        bottom: 5,
      },
      {
        src: BirdThumb,
        width: 25,
        left: 5,
        top: 20,
        bottom: 5,
      },
    ],
  },
  {
    _type: "website",
    slug: "moss",
    title: "moss",
    description: "moss",
    images: [
      {
        src: MossThumb,
        width: 40,
        left: 30,
      },
    ],
  },
  {
    _type: "dj",
    slug: "night-market",
    title: "hypnagogic night market mix",
    description: "moss",
    images: [
      {
        src: TradeThumb,
        width: 30,
        left: 20,
      },
    ],
  },
  {
    _type: "blog",
    slug: "apple-murderer",
    title: "the apple murderer",
    description: "imagine an apple\nheck...\nimagine two apples",
    images: [
      {
        src: AppleThumb,
        width: 20,
        left: 80,
        bottom: 5,
      },
    ],
  },
  {
    _type: "website",
    slug: "portfolio",
    title: "nit-su-j.online",
    description: "first iteration",
    images: [
      {
        src: Desktop,
        width: 55,
        left: 35,
        top: 40,
        absolute: true,
        zIndex: 0,
      },
      {
        src: MeThumb,
        width: 30,
        left: 60,
      },
      {
        src: ClickThumb,
        width: 27,
        left: 57,
        top: 15,
        absolute: true,
        zIndex: 1,
      },
    ],
  },
  {
    _type: "dj",
    slug: "nye",
    title: "NYE!!!",
    description: "almonds",
    images: [
      {
        src: NYE,
        width: 15,
        left: 65,
        bottom: -10,
      },
    ],
  },
  {
    _type: "website",
    slug: "almond-cam",
    title: "almond.cam",
    description: "almonds",
    images: [
      {
        src: AlmondThumb,
        width: 35,
        left: 15,
      },
    ],
  },
  {
    _type: "film",
    slug: "golf",
    title: "golf",
    description: "golf",
    images: [
      {
        src: GolfThumb,
        width: 30,
        left: 40,
        top: 3,
        bottom: 10,
      },
      {
        src: GolfThumb2,
        width: 36,
        left: 37,
        absolute: true,
        zIndex: 1,
      },
    ],
  },
  {
    _type: "dj",
    slug: "art-exhibition",
    title: "art exhibition",
    description: "almonds",
    images: [
      {
        src: Bird,
        width: 25,
        height: 75,
        left: 30,
      },
      {
        src: ArtThumb,
        width: 25,
        left: 30,
        block: true,
        top: -10,
        bottom: -10,
      },
    ],
  },
  {
    _type: "film",
    slug: "bug-talk",
    title: "bug talk",
    description: "almonds",
    images: [
      {
        src: ForgThumb,
        width: 30,
        left: 52,
        top: -6,
        absolute: true,
        zIndex: 0,
      },
      {
        src: BugThumb,
        width: 40,
        left: 45,
      },
    ],
  },
  {
    _type: "film",
    slug: "rat-detective",
    title: "rat detective",
    description: "rat",
    images: [
      {
        src: RatThumb,
        width: 40,
        left: 10,
      },
    ],
  },
  {
    _type: "website",
    slug: "viz",
    title: "viz",
    description: "viz",
    images: [
      {
        src: GarThumb,
        width: 40,
        height: 85,
        left: 25,
        bottom: -15,
      },
      {
        src: Gar,
        width: 15,
        left: 55,
        top: 40,
        absolute: true,
      },
    ],
  },
  {
    _type: "blog",
    slug: "inktober",
    title: "wake me up",
    description: "m",
    images: [
      {
        src: DogThumb,
        width: 100,
        bottom: 5,
      },
    ],
  },
  {
    _type: "film",
    slug: "moonglasses",
    title: "moonglasses",
    description: "moonglasses",
    images: [
      {
        src: MoonThumb2,
        width: 30,
        left: 45,
        absolute: true,
        zIndex: 0,
      },
      {
        src: MoonThumb,
        width: 50,
        left: 50,
        top: 10,
      },
    ],
  },
  {
    _type: "website",
    slug: "plastic-style",
    title: "plastic style",
    description: "viz",
    images: [
      {
        src: Sky,
        width: 48,
        left: 26,
        top: 1,
      },
      {
        src: PlasThumb,
        width: 20,
        left: 40,
        absolute: true,
        zIndex: 1,
      },
    ],
  },
  {
    _type: "dj",
    slug: "bushwick-rooftop",
    title: "rooftop",
    description: "m",
    images: [
      {
        src: Words,
        width: 30,
        height: 200,
        left: 70,
        bottom: 10,
        top: -40,
      },
    ],
  },
  {
    _type: "film",
    slug: "euro-vlogs",
    title: "euro vlogs",
    description: "viz",
    images: [
      {
        src: EuroThumb,
        width: 50,
      },
    ],
  },
  {
    _type: "dj",
    slug: "ambient-housewarming",
    title: "ambient house housewarming",
    description: "m",
    images: [
      {
        src: Clock,
        width: 30,
        left: 40,
        bottom: 10,
      },
      {
        src: AmbThumb,
        width: 15,
        left: 37,
        absolute: true,
        zIndex: 1,
        top: 48,
      },
    ],
  },
  {
    _type: "film",
    slug: "think-in",
    title: "think in",
    description: "m",
    images: [
      {
        src: Alien,
        width: 23,
        left: 64,
        absolute: true,
        zIndex: 1,
      },
      {
        src: Window,
        width: 25,
        left: 60,
        absolute: true,
        zIndex: 2,
      },
      {
        src: WindowBG,
        width: 25,
        left: 60,
      },
    ],
  },
];
