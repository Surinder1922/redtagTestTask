import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { imagesPath } from "../assets/images";
import { useCart } from "../providers/CartProvider";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import dynamicStyles from "../styles/global-styles";
import { useTranslation } from "react-i18next";

const CartComponent = () => {
  const AnimatedCart = Animated.createAnimatedComponent(Image);
  const {i18n} = useTranslation();
  const styles = dynamicStyles({language:i18n.language});
  const { cartItems } = useCart();
  // const shake = useSharedValue(0);
  const swing = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    swing.value = withSequence(
      withTiming(-10, { duration: 200 }),
      withTiming(10, { duration: 100 }),
      withTiming(-5, { duration: 200 }),
      withTiming(5, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );

    scale.value = withSequence(
      withTiming(1.5, { duration: 200 }),
      withTiming(1, { duration: 200 })
    );
  }, [cartItems]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${swing.value}deg`,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });
  return (
    <View style={styles.cartContainer}>
      <AnimatedCart style={[styles.cartIcon, animatedStyle]} source={imagesPath.icCart} />
      {cartItems.length ? (
        <View style={styles.cartIconCountContainer}>
          <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default CartComponent;
