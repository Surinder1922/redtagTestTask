import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getPercentageOff } from '../utils/misc'
import { useTranslation } from 'react-i18next';
import dynamicStyles from '../styles/global-styles';

const ProductPriceInfo = ({currency,minPrice,comparePrice}) => {
  const { i18n, t } = useTranslation();
  const styles = dynamicStyles({language: i18n.language})
  return (
    <View style={styles.productPriceSection}>
    <View style={styles.productPriceRow}>
      <Text style={styles.productCurrency}>{currency}</Text>
      <Text style={styles.productOfferPrice}>{minPrice}</Text>
      <Text style={styles.productActualPrice}>{comparePrice}</Text>
    </View>
    <View style={styles.discountBox}>
      <Text style={styles.discountPercentText}>{t('discount_percentage', {discount:getPercentageOff(comparePrice, minPrice).toFixed(0)})}</Text>
    </View>
  </View>
  )
}

export default ProductPriceInfo

