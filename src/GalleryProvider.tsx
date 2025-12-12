/* eslint-disable simple-import-sort/imports */
import { useMemo } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import Gallery from './Gallery';
import { useSizeVector } from './commons/hooks/useSizeVector';
import { useVector } from './commons/hooks/useVector';
import { GalleryContext } from './context';
import type { GalleryProps, GalleryRefType } from './types';

type GalleryPropsWithRef<T> = GalleryProps<T> & {
  reference?: React.ForwardedRef<GalleryRefType>;
};

const GalleryProvider = <T,>(props: GalleryPropsWithRef<T>) => {
  const rootSize = useSizeVector(0, 0);
  const rootChildSize = useSizeVector(0, 0);
  const translate = useVector(0, 0);

  const scale = useSharedValue<number>(1);
  const scroll = useSharedValue<number>(0);
  const scrollOffset = useSharedValue<number>(0);
  const activeIndex = useSharedValue<number>(props.initialIndex ?? 0);
  const isScrolling = useSharedValue<boolean>(false);
  const hasZoomed = useSharedValue<boolean>(false);
  const overflow = useSharedValue<'hidden' | 'visible'>('hidden');
  const hideAdjacentItems = useSharedValue<boolean>(false);

  const contextValues = useMemo(
    () => ({
      rootSize,
      rootChildSize,
      translate,
      scale,
      scroll,
      scrollOffset,
      activeIndex,
      isScrolling,
      hasZoomed,
      overflow,
      hideAdjacentItems,
    }),
    [
      rootSize,
      rootChildSize,
      translate,
      scale,
      scroll,
      scrollOffset,
      activeIndex,
      isScrolling,
      hasZoomed,
      overflow,
      hideAdjacentItems,
    ]
  );

  return (
    <GalleryContext.Provider value={contextValues}>
      <Gallery {...props} />
    </GalleryContext.Provider>
  );
};

export default GalleryProvider;
