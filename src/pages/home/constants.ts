import { GalleyThumbnailDefinition, OptionType } from "../../sanity";
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
import type { PortableTextBlock } from "@portabletext/types";

export type ImageDefinition = {
  image: string;
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
  slug: string | { current: string };
  title: string;
  subtitle: string | PortableTextBlock;
  thumbnails2?: ImageDefinition[];
  thumbnails?: GalleyThumbnailDefinition[];
};

export const ITEMS: ItemDefinition[] = [
  {
    _type: "film",
    slug: "asia-vlog",
    title: "🇹🇭...🇻🇳...🇯🇵...🇹🇼",
    subtitle:
      "4 countries\n4 vlogs\n4 friends (sometimes less, sometimes more)\n4 billion mopeds",
    thumbnails2: [
      {
        image: AsiaThumb,
        width: 90,
      },
      {
        image: AsiaThumb2,
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
    subtitle: "a noisy dubby punky mix\ncool music video too!",
    thumbnails2: [
      {
        image: BabyThumb,
        width: 100,
        heightPx: 150,
        absolute: true,
        zIndex: 1,
      },
      {
        image: TracksThumb,
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
    subtitle: "if u like daft punk...",
    thumbnails2: [
      {
        image: B2BThumb,
        width: 21,
        left: 39,
        absolute: true,
        zIndex: 1,
      },
      {
        image: GridThumb,
        width: 50,
        left: 25,
      },
    ],
  },
  {
    _type: "dj",
    slug: "aquacore",
    title: "aquacore",
    subtitle: "aquatic jungle mix",
    thumbnails2: [
      {
        image: AThumb2,
        width: 20,
        left: 40,
      },
      {
        image: AThumb,
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
    subtitle: "a bit of trip hop",
    thumbnails2: [
      {
        image: LightThumb,
        width: 60,
        left: 30,
      },
      {
        image: LightThumb2,
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
    subtitle: "birdie",
    thumbnails2: [
      {
        image: BirdThumb2,
        width: 40,
        left: 10,
        bottom: 5,
      },
      {
        image: BirdThumb,
        width: 25,
        left: 5,
        top: 20,
        bottom: 5,
      },
    ],
  },
  {
    _type: "website",
    slug: "moss-simulator",
    title: "Don't worry, you're the same old moss you once were",
    subtitle: "wow that's a long title for a 100 second experience",
    thumbnails2: [
      {
        image: MossThumb,
        width: 40,
        left: 30,
      },
    ],
  },
  {
    _type: "dj",
    slug: "night-market",
    title: "hypnagogic night market mix",
    subtitle: "moss",
    thumbnails2: [
      {
        image: TradeThumb,
        width: 30,
        left: 20,
      },
    ],
  },
  {
    _type: "blog",
    slug: "apple-murderer",
    title: "the apple murderer",
    subtitle: "imagine an apple\nheck...\nimagine two apples",
    thumbnails2: [
      {
        image: AppleThumb,
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
    subtitle: "first iteration",
    thumbnails2: [
      {
        image: Desktop,
        width: 55,
        left: 35,
        top: 40,
        absolute: true,
        zIndex: 0,
      },
      {
        image: MeThumb,
        width: 30,
        left: 60,
      },
      {
        image: ClickThumb,
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
    subtitle: "almonds",
    thumbnails2: [
      {
        image: NYE,
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
    subtitle: "almonds",
    thumbnails2: [
      {
        image: AlmondThumb,
        width: 35,
        left: 15,
      },
    ],
  },
  {
    _type: "film",
    slug: "golf",
    title: "golf",
    subtitle: "golf",
    thumbnails2: [
      {
        image: GolfThumb,
        width: 30,
        left: 40,
        top: 3,
        bottom: 10,
      },
      {
        image: GolfThumb2,
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
    subtitle: "almonds",
    thumbnails2: [
      {
        image: Bird,
        width: 25,
        height: 75,
        left: 30,
      },
      {
        image: ArtThumb,
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
    subtitle: "almonds",
    thumbnails2: [
      {
        image: ForgThumb,
        width: 30,
        left: 52,
        top: -6,
        absolute: true,
        zIndex: 0,
      },
      {
        image: BugThumb,
        width: 40,
        left: 45,
      },
    ],
  },
  {
    _type: "film",
    slug: "rat-detective",
    title: "rat detective",
    subtitle: "rat",
    thumbnails2: [
      {
        image: RatThumb,
        width: 40,
        left: 10,
      },
    ],
  },
  {
    _type: "website",
    slug: "viz",
    title: "viz",
    subtitle: "viz",
    thumbnails2: [
      {
        image: GarThumb,
        width: 40,
        height: 85,
        left: 25,
        bottom: -15,
      },
      {
        image: Gar,
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
    subtitle: "m",
    thumbnails2: [
      {
        image: DogThumb,
        width: 100,
        bottom: 5,
      },
    ],
  },
  {
    _type: "film",
    slug: "moonglasses",
    title: "moonglasses",
    subtitle: "moonglasses",
    thumbnails2: [
      {
        image: MoonThumb2,
        width: 30,
        left: 45,
        absolute: true,
        zIndex: 0,
      },
      {
        image: MoonThumb,
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
    subtitle: "viz",
    thumbnails2: [
      {
        image: Sky,
        width: 48,
        left: 26,
        top: 1,
      },
      {
        image: PlasThumb,
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
    subtitle: "m",
    thumbnails2: [
      {
        image: Words,
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
    subtitle: "viz",
    thumbnails2: [
      {
        image: EuroThumb,
        width: 50,
      },
    ],
  },
  {
    _type: "dj",
    slug: "ambient-housewarming",
    title: "ambient house housewarming",
    subtitle: "m",
    thumbnails2: [
      {
        image: Clock,
        width: 30,
        left: 40,
        bottom: 10,
      },
      {
        image: AmbThumb,
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
    subtitle: "m",
    thumbnails2: [
      {
        image: Alien,
        width: 23,
        left: 64,
        absolute: true,
        zIndex: 1,
      },
      {
        image: Window,
        width: 25,
        left: 60,
        absolute: true,
        zIndex: 2,
      },
      {
        image: WindowBG,
        width: 25,
        left: 60,
      },
    ],
  },
];
