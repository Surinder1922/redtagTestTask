import { Image, Text, View } from "react-native";
import React from "react";
import { imagesPath } from "../assets/images";
import { useTranslation } from "react-i18next";
import dynamicStyles from "../styles/global-styles";

const DiscountCouponInfo = ({ message = "-" }) => {
  const { i18n } = useTranslation();
  const styles = dynamicStyles({language: i18n.language})
  return (
    <View style={styles.couponBoxContainer}>
      <View style={styles.couponBox}>
        <Image style={styles.couponTagIcon} source={imagesPath.icPriceTag} />
        <Text style={styles.offerMessageText}>{message}</Text>
      </View>
    </View>
  );
};

export default DiscountCouponInfo;
