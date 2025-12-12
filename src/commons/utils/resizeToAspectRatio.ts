import { Extrapolation, interpolate } from 'react-native-reanimated';

// Since we are copying files, we might miss types referenced from other places not in our list.
// The original file imports ResizeConfig from '../../components/snapback/types'.
// We don't have that file. We'll define ResizeConfig here locally to satisfy the type.
// If it was just used as a type, we might not strictly need the full definition if not used.
// But let's look at usage: `resizeConfig.size`, `resizeConfig.aspectRatio`, `resizeConfig.scale`.
// It seems simple enough to define.

// Defining local type based on usage in this function
type ResizeConfig = {
  size: { width: number; height: number };
  aspectRatio: number;
  scale: number;
};

type ResizeOptions = {
  resizeConfig: ResizeConfig | undefined;
  width: number;
  height: number;
  scale: number;
};

type AspectRatioSize = {
  width: number;
  height: number;
  deltaX: number;
  deltaY: number;
};

export const resizeToAspectRatio = ({
  resizeConfig,
  width,
  height,
  scale,
}: ResizeOptions): AspectRatioSize => {
  'worklet';
  let finalWidth = width;
  let finalHeight = height;

  if (resizeConfig !== undefined) {
    const { size, aspectRatio, scale: resizeScale } = resizeConfig;
    const isWide = aspectRatio > 1;

    finalWidth = isWide
      ? interpolate(
          scale,
          [1, resizeScale],
          [size.width, size.height * aspectRatio],
          Extrapolation.CLAMP
        )
      : size.width;

    finalHeight = isWide
      ? size.height
      : interpolate(
          scale,
          [1, resizeScale],
          [size.height, size.width / aspectRatio],
          Extrapolation.CLAMP
        );
  }

  const deltaX = (finalWidth - width) / 2;
  const deltaY = (finalHeight - height) / 2;

  return { width: finalWidth, height: finalHeight, deltaX, deltaY };
};
