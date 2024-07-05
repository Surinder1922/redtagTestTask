import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withRepeat, interpolate } from 'react-native-reanimated';
import { imagesPath } from '../assets/images';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Loader = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      true
    );
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const scaleInterpolation = interpolate(scale.value, [0.5, 1, 1.5,2], [0.5,1, 1.5,2]);
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scaleInterpolation },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedImage source={imagesPath.icCart} style={[styles.image, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 32,
    width: 32,
  },
});

export default Loader;
