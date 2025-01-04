# Confetti Playground 🎉

An interactive React Native animation showcase featuring draggable tiles and celebratory confetti effects. Built with Reanimated and Skia for smooth, performant animations.

## ✨ Features

- 🎯 Draggable tiles with spring animations
- 🎨 Dynamic color transitions
- 📱 Haptic feedback for enhanced interaction
- 🎊 Particle-based confetti celebrations
- ⚡️ Optimized performance with Skia

## 🛠 Dependencies

- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [@shopify/react-native-skia](https://shopify.github.io/react-native-skia/)
- [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
  
## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/akshayjadhav4/confetti-playground.git
   ```
2. Install dependencies:
   ```bash
   cd confetti-playground && npm install
   ```

## 📱 Running App

iOS:
```bash
npm run ios
```

Android:
```bash
npm run android
```

## ⚙️ Customization

### Confetti Settings
Fine-tune the celebration effect in `components/Confetti.tsx`:
- Number of particles
- Spread pattern and velocity
- Animation timing
- Particle dimensions

### Tile Properties
Adjust tile behavior in `components/PlaygroundTile.tsx`:
- Dimensions and layout
- Spring animation physics
- Rotation dynamics
- Initial positions

## 🎥 Demo

![Confetti Demo](./assets/demo.gif)

## 🙌 Credits

Inspired by [Toni Lijic's animation](https://x.com/tonilijic/status/1790328090620518602) on X (formerly Twitter).
