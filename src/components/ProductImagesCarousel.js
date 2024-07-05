import { Dimensions, Image, View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { useTranslation } from "react-i18next";
import dynamicStyles from "../styles/global-styles";

const ProductImagesCarousel = ({ images = [] }) => {
  const { i18n } = useTranslation();
  const styles = dynamicStyles({language: i18n.language})
  const { width, height } = Dimensions.get("window");
  return (
    <Carousel
      
      loop={false}
      width={width / 2}
      height={height / 3.5}
      autoPlay={false}
      data={images ?? []}
      scrollAnimationDuration={1000}
      onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={({ item: cItem }) => (
        <View style={styles.productImagesContainer}>
          <Image
            style={[
              styles.productImage,
              {
                height: height / 3.5,
                width: width / 2 - 18,
              },
            ]}
            source={{ uri: cItem }}
          />
        </View>
      )}
    />
  );
};

export default ProductImagesCarousel;
