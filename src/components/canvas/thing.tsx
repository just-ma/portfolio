import React, { forwardRef, useMemo } from "react";
import { Uniform } from "three";
import { Effect } from "postprocessing";

const fragmentShader2 = `
void mainUv(inout vec2 uv) {
  vec2 aspectCorrection = vec2(aspect, 1.0);

  float angle = (distance - radius) * PI2 / waveSize;
  float cosSin = (1.0 - cos(angle)) * 0.5;

  float extent = maxRadius + waveSize;
  float decay = max(extent - distance * distance, 0.0) / extent;

  uv -= ((cosSin * amplitude * difference) / distance) * decay;

	if(active) {

		vec2 aspectCorrection = vec2(aspect, 1.0);
		vec2 difference = uv * aspectCorrection - center * aspectCorrection;
		float distance = sqrt(dot(difference, difference)) * vSize;

		if(distance > radius) {

			if(distance < radius + waveSize) {

				

			}

		}

	}

}
`;

const fragmentShader4 = `
float k = 2.;

void mainUv(inout vec2 uv) {
  vec2 aspectCorrection = vec2(aspect, 1.0);

  vec2 coord = (2.0 * uv - vec2(1));

  float r = tan(k * atan(length(coord) / 2.0)) * 1.0 / k;
  coord = normalize(coord) * r;

  uv = 0.5 * coord + vec2(0.5);
}
`;

const fragmentShader3 = `
float r = 1.2;

void mainUv(inout vec2 uv) {
  vec2 aspectCorrection = vec2(aspect, 1.0);

  vec2 coord = (2.0 * uv - vec2(1)) * aspectCorrection;
  float z = sqrt(1. - (pow(coord.x, 2.) + pow(coord.y, 2.)) / (pow(r, 2.) * aspect));
  coord = coord + coord * pow(z, 1.) * 0.8;

  uv = 0.5 * coord / aspectCorrection + vec2(0.5);
}
`;

const fragmentShader = `
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
 outputColor = inputColor;
}
`;

// Effect implementation
class MyCustomEffectImpl extends Effect {
  constructor() {
    super("MyCustomEffect", fragmentShader4);
  }
}

// Effect component
export const MyCustomEffect = forwardRef((_, ref) => {
  const effect = useMemo(() => new MyCustomEffectImpl(), []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
