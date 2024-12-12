import { GalleyThumbnailDefinition, OptionType } from "../../sanity";
import Alien from "./alien.gif";
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
    // first iteration of my portfolio website
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
    // a gabber mix to welcome the new year
    // u know i had to include some black-eyed peas
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
    // smile! you're on almond camera
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
    //
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
    // 10 artists
    // 5 DJs
    // 1 roof
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
    // an experimental short film:
    // been thinking about friends, portals, and bugs recently...
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
    // a detective noir short film:
    // he takes a bite of the big apple
    // but at what cost?
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
    // a webcam 3D visualizer
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
    // 31 ink drawings for 31 days of inktober
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
    // an experimental animated short film:
    // on a night when the moon is particularly bright...
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
    // a music blog run by my friend Parker
    // weirdly food focused
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
    // an electronic mix
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
    // i took a walk in prague and did a spin in berlin
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
    // ambient mix
    // for my housewarming, i hung up a giant balloon
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
    // animated music video:
    // a lil green alien wanders SF from dusk to dawn
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
