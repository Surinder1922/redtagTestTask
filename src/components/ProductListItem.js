import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../styles/colors';
import { imagesPath } from '../assets/images';
import ProductImagesCarousel from './ProductImagesCarousel';
import DiscountCouponInfo from './DiscountCouponInfo';
import ProductPriceInfo from './ProductPriceInfo';
  import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import dynamicStyles from '../styles/global-styles';
const ProductListItem = ({ item, onPressLikeIcon, onPressAddToCart }) => {
  const [showMessage, setShowMessage] = useState(false);
  const scale = useSharedValue(1);
  const { i18n } = useTranslation();
  const styles = dynamicStyles({language: i18n.language})
  const formattedImages = Object.values(item?.images ?? []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });


  const MemoizedLikeButton = React.useMemo(() => ({ onPress }) => {
    return <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.likeIconContainer}>
      <Image style={{ height: 22, width: 22, tintColor: item?.isLiked ? colors.primary : undefined }} source={item?.isLiked ? imagesPath.icLiked : imagesPath.icLike} />
    </TouchableOpacity>
  })

  const handleOnPressAnimation = () => {
    onPressAddToCart()
    setShowMessage(true);
    scale.value = withSpring(1.2); // Scale up animation
    setTimeout(() => {
      setShowMessage(false);
      scale.value = withSpring(1);

    }, 1500);
  }
  const MemoizedAddToCartButton = React.useMemo(() => ({ onPress }) => {
    return <Animated.View style={[{ padding: 10 }, animatedStyle]}>

        <TouchableOpacity activeOpacity={1} onPress={() => onPress(item)} style={styles.addToCartIconContainer}>
          <Image style={{ height: 22, width: 22 }} source={imagesPath.icAddToCart} />
        </TouchableOpacity>
        {showMessage && (
        <Animated.View
          style={{
            position: 'absolute',
            backgroundColor: colors.primaryLight,
            padding: 10,
            borderRadius: 10,
            bottom: 24,
            right:i18n.language==='en'?20 :0,
            left:i18n.language==='ar'?20 :0,

            opacity: 1,
            transform: [{ translateY: -20 }],
          }}
        >
          <Text style={{ fontWeight:'bold',color: colors.primary, fontSize: 10   }}>Added to Cart</Text>
        </Animated.View>
      )}
      </Animated.View>
  });
  return (
    <View style={styles.productListContainer}>
      <ProductImagesCarousel images={formattedImages} />
      <View style={{ padding: 8, }}>
        <MemoizedAddToCartButton onPress={handleOnPressAnimation} />
        <Text style={styles.productTitle} >{item?.title || '-'}</Text>
        <ProductPriceInfo comparePrice={item?.compare_at_price_min} currency={item?.currency} minPrice={item?.price_min} />
        {!!item['offer-message'] && <DiscountCouponInfo message={item['offer-message']} />}
      </View>
      <MemoizedLikeButton onPress={onPressLikeIcon} />

    </View>
  )
}

export default React.memo(ProductListItem);
