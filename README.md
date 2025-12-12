# react-native-zoom-gallery

A performant, gesture-based zoom gallery for React Native, powered by **Reanimated 3** and **Gesture Handler**. Inspired by `react-native-zoom-toolkit`, this library provides a smooth, native-feeling image and video gallery experience with support for pinch-to-zoom, panning, double-tap, and custom transitions.

## Features

- 🚀 **High Performance**: Built with `react-native-reanimated` for 60fps animations on the UI thread.
- 👆 **Gestures**: Pinch-to-zoom, pan, double-tap, and swipe support using `react-native-gesture-handler`.
- 📱 **Virtualization**: Efficiently renders large lists of media using windowing.
- 🎨 **Customizable**: Full control over rendering items, transitions, and gesture behaviors.
- ↕️ **Orientation**: Supports both horizontal and vertical scrolling.
- 🧩 **TypeScript**: Fully typed for a great developer experience.

## Installation

### 1. Install the package

```sh
npm install react-native-zoom-gallery
# or
yarn add react-native-zoom-gallery
```

### 2. Install Peer Dependencies

This library requires `react-native-reanimated` and `react-native-gesture-handler`.

```sh
npm install react-native-reanimated react-native-gesture-handler
# or
yarn add react-native-reanimated react-native-gesture-handler
```

> [!IMPORTANT]
> Make sure to follow the installation instructions for [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) and [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) (e.g., wrapping your app in `GestureHandlerRootView` and updating `babel.config.js`).

## Usage

Wrap your application (or the screen) with `GestureHandlerRootView`, then use the `Gallery` component.

```tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Gallery from 'react-native-zoom-gallery';

const images = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  // ...
];

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Gallery
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        initialIndex={0}
        gap={20}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `T[]` | **Required** | Array of data items to render. |
| `renderItem` | `(item: T, index: number) => ReactNode` | **Required** | Function to render each item. |
| `keyExtractor` | `(item: T, index: number) => string` | `index` | Unique key for each item. |
| `initialIndex` | `number` | `0` | Index of the item to show initially. |
| `windowSize` | `number` | `5` | Number of items to render simultaneously (optimization). |
| `gap` | `number` | `0` | Spacing between items. |
| `maxScale` | `number` \| `SizeVector[]` | `6` | Maximum zoom scale. Can be a single number or an array of size vectors for per-item limits. |
| `vertical` | `boolean` | `false` | If `true`, the gallery scrolls vertically. |
| `zoomEnabled` | `boolean` | `true` | Enables or disables zoom gestures. |
| `allowOverflow` | `boolean` | `false` | If `true`, allows items to overflow their container visible bounds. |
| `tapOnEdgeToItem` | `boolean` | `true` | If `true`, tapping the edges moves to the previous/next item (horizontal only). |
| `scaleMode` | `'bounce'` \| `'clamp'` | `'bounce'` | Defines behavior when zooming past limits. |
| `pinchMode` | `'bounce'` \| `'clamp'` \| `'friction'` | `'clamp'` | Defines pinch gesture behavior. |
| `allowPinchPanning` | `boolean` | `true` | Allows panning while pinching. |
| `longPressDuration` | `number` | `500` | Duration (ms) to trigger `onLongPress`. |
| `customTransition` | `(options: GalleryTransitionState) => ViewStyle` | - | Custom transition animation for items. |

### Callbacks

| Callback | Description |
|---|---|
| `onIndexChange` | `(index: number) => void` - Called when the active item changes. |
| `onScroll` | `(scroll: number, contentOffset: number) => void` - Called on scroll (worklet). |
| `onTap` | `(e: TapGestureEvent, index: number) => void` - Called on single tap. |
| `onDoubleTap` | `(e: TapGestureEvent, index: number) => void` - Called on double tap. |
| `onLongPress` | `(e: LongPressEvent, index: number) => void` - Called on long press. |
| `onPanStart` | `(e: PanGestureEvent) => void` - Called when panning starts. |
| `onPanEnd` | `(e: PanGestureEvent) => void` - Called when panning ends. |
| `onPinchStart` | `(e: PinchGestureEvent) => void` - Called when pinching starts. |
| `onPinchEnd` | `(e: PinchGestureEvent) => void` - Called when pinching ends. |
| `onSwipe` | `(direction: SwipeDirection) => void` - Called on swipe gestures. |
| `onZoomBegin` | `(index: number) => void` - Called when an item is zoomed in. |
| `onZoomEnd` | `(index: number) => void` - Called when an item returns to normal scale. |
| `onVerticalPull` | `(translateY: number, released: boolean) => void` - Called during vertical pull gestures (useful for "pull to close"). |
| `onGestureEnd` | `() => void` - Called when any gesture ends. |

## Methods

You can access these methods via a `ref`.

```tsx
type GalleryRef = {
  setIndex: (index: number) => void;
  reset: (animate?: boolean) => void;
  getState: () => CommonZoomState<number>;
};
```

| Method | Description |
|---|---|
| `setIndex(index)` | Programmatically scroll to a specific index. |
| `reset(animate?)` | Reset zoom and translation of the current item. |
| `getState()` | Get current state (scale, translation, size, etc.). |

## License

MIT
