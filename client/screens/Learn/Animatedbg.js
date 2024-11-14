import React, { useEffect } from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function AnimatedBackground() {
  const { height } = useWindowDimensions();

  const top1 = useSharedValue(0.3 * height);
  const top2 = useSharedValue(0.5 * height);
  const top3 = useSharedValue(0.7 * height);

  useEffect(() => {
    // Reduced duration to speed up the animation
    const options = {
      duration: 2000, // Adjusted for faster speed (originally 4000)
      easing: Easing.bezier(0.5, 0, 0.5, 1),
    };
    top1.value = withRepeat(withTiming(0.2 * height, options), -1, true);
    top2.value = withDelay(
      1000,
      withRepeat(withTiming(0.4 * height, options), -1, true)
    );
    top3.value = withDelay(
      2000,
      withRepeat(withTiming(0.6 * height, options), -1, true)
    );
  }, [height, top1, top2, top3]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    top: top1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    top: top2.value,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    top: top3.value,
  }));

  return (
    <View style={styles.container}>
      {/* Circles */}
      <Animated.View style={[styles.circle, styles.circleYellow400, animatedStyle1]} />
      <Animated.View style={[styles.circle, styles.circleYellow300, animatedStyle2]} />
      <Animated.View style={[styles.circle, styles.circleOrange500, animatedStyle3]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: '400%',
    aspectRatio: 1,
    borderRadius: 9999, // To make it fully rounded
  },
  circleYellow400: {
    backgroundColor: '#facc15', // Equivalent to bg-yellow-400
  },
  circleYellow300: {
    backgroundColor: '#fde047', // Equivalent to bg-yellow-300
  },
  circleOrange500: {
    backgroundColor: '#f97316', // Equivalent to bg-orange-500
  },
});
