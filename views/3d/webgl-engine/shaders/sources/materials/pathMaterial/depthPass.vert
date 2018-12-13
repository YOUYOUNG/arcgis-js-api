#include <util/vsPrecision.glsl>

#include <materials/pathMaterial/commonInputs.glsl>

uniform vec2 nearFar;
attribute vec3 position;
attribute vec4 auxpos1; // direction offset

varying float depth;
varying vec3 vpos;

#ifdef TEXTURING
attribute vec2 uv0;
varying vec2 vtc;
#ifdef TEXTURE_ATLAS
attribute vec4 region;
varying vec4 regionV;
#endif
#endif

#include <materials/pathMaterial/visualVariables.glsl>

#if defined(VV_SIZE)
attribute vec4 auxpos2;
#endif

#include <materials/pathMaterial/commonFunctions.glsl>

void main(void) {
  vpos = calculateVPos();

  vec4 eye = view * vec4(vpos, 1.0);

  gl_Position = proj * eye;
  depth = (-eye.z - nearFar[0]) / (nearFar[1] - nearFar[0]) ;

#ifdef TEXTURING
#ifndef FLIPV
  vtc = uv0;
#else
  vtc = vec2(uv0.x, 1.0-uv0.y);
#endif
#ifdef TEXTURE_ATLAS
  regionV = region;
#endif
#endif /* TEXTURING */

}
