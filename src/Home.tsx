import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HomeMenu from "./HomeMenu";
import {
  FRAME_DURATION,
  HOME_ITEM_ANGLE,
  HOME_ROTATION_DURATION,
  MENU_OPTIONS,
  NUM_MENU_OPTIONS,
} from "./constants";
import { OptionDefinition } from "./types";
import { bounce, easeInOutExpo } from "./utils";

const ITEM_BOUNCE_DURATION = 1000;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledCanvas = styled(Canvas)`
  position: absolute !important;
  z-index: -1;
  top: 0;
  left: 0;
`;

const PlaneObject = ({
  rotation,
  index,
  active,
}: {
  rotation: number;
  index: number;
  option: OptionDefinition;
  active: boolean;
}) => {
  const baseYPosition = 0.25;

  const lastActiveTimestamp = useRef(0);
  const [yPosition, setYPosition] = useState(baseYPosition);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (active) {
      lastActiveTimestamp.current = performance.now();
      intervalId = setInterval(() => {
        if (
          performance.now() - lastActiveTimestamp.current >
          ITEM_BOUNCE_DURATION
        ) {
          clearInterval(intervalId);
          setYPosition(baseYPosition);
          return;
        }

        const normalizedIncrement = bounce(
          (performance.now() - lastActiveTimestamp.current) /
            ITEM_BOUNCE_DURATION
        );
        const scaledIncrement = normalizedIncrement * 0.6;
        setYPosition(baseYPosition + scaledIncrement);
      }, FRAME_DURATION);
    }

    return () => {
      clearInterval(intervalId);
      setYPosition(baseYPosition);
    };
  }, [active]);

  const itemAngle = (index + 2) * HOME_ITEM_ANGLE;

  return (
    <group rotation={[0, rotation, 0]}>
      <mesh position={[Math.cos(itemAngle), yPosition, Math.sin(itemAngle)]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </group>
  );
};

const Home = () => {
  const lastRotation = useRef(0);
  const lastRotationTimestamp = useRef(performance.now());
  const numRotationsRef = useRef(0);

  const [rotation, setRotation] = useState(HOME_ITEM_ANGLE);
  const [numRotations, setNumRotations] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const normalizedIncrement = easeInOutExpo(
        (performance.now() - lastRotationTimestamp.current) /
          HOME_ROTATION_DURATION
      );
      const scaledIncrement = normalizedIncrement * HOME_ITEM_ANGLE;
      setRotation(lastRotation.current - scaledIncrement);
    }, FRAME_DURATION);

    const intervalId2 = setInterval(() => {
      lastRotation.current = -numRotationsRef.current * HOME_ITEM_ANGLE;
      lastRotationTimestamp.current = performance.now();
    }, HOME_ROTATION_DURATION);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const decrementActiveOptionIndex = () => {
      setNumRotations((prev) => prev + 1);
      numRotationsRef.current++;
    };

    const timeoutId = setTimeout(() => {
      decrementActiveOptionIndex();

      intervalId = setInterval(() => {
        decrementActiveOptionIndex();
      }, HOME_ROTATION_DURATION);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const activeItemIndex =
    NUM_MENU_OPTIONS - 1 - (numRotations % NUM_MENU_OPTIONS);

  return (
    <Page>
      hi my name is Justin Ma
      <HomeMenu />
      <StyledCanvas>
        <PerspectiveCamera
          position={[0, 3, 6]}
          rotation={[-0.4, 0, 0]}
          makeDefault
        />
        {MENU_OPTIONS.map((option, index) => (
          <PlaneObject
            key={option.path}
            index={index}
            rotation={rotation}
            option={option}
            active={index === activeItemIndex}
          />
        ))}
        <group rotation={[0, rotation, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[4, 4, 8, 8]} />
            <meshNormalMaterial wireframe />
          </mesh>
        </group>
      </StyledCanvas>
    </Page>
  );
};

export default Home;
