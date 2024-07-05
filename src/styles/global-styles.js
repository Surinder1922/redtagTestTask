import { colors } from "./colors";

const { StyleSheet } = require("react-native");
const dynamicStyles = ({ language = "en" }) => {
  const styles = Object.freeze(
    StyleSheet.create({
      root: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: colors.white,
      },
      productListContentContainer: {
        marginHorizontal: 8,
        gap: 4,
      },
      productListContainer: {
        flex: 1,
        borderRadius: 12,
        paddingBottom: 12,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
        margin: 6,
      },
      productImagesContainer: {
        flex: 1,
        borderRadius: 12,
      },
      productImage: {
        borderRadius: 12,
        overflow: "hidden",
      },
      productTitle: {
        fontSize: 12,
        marginBottom: 12,
        textAlign: language === "en" ? "left" : "right",
      },
      productPriceSection: {
        flexDirection: language === "en" ? "row" : "row-reverse",
        justifyContent: "space-between",
      },
      productPriceRow: {
        flexDirection: language === "en" ? "row" : "row-reverse",
        alignItems: "flex-end",
      },
      productCurrency: {
        fontSize: 8,
        color: colors.primary,
        fontWeight: "bold",
      },
      productOfferPrice: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: "bold",
        marginLeft: 2,
      },
      productActualPrice: {
        fontSize: 10,
        marginLeft: 5,
        textDecorationLine: "line-through",
      },
      discountBox: {
        padding: 4,
        borderWidth: 1,
        backgroundColor: colors.primaryLight,
        borderRadius: 6,
        borderColor: "#e6002859",
      },
      discountPercentText: {
        fontSize: 10,
        fontWeight: "bold",
        color: colors.primary,
      },
      couponBoxContainer: {
        flexDirection: language === "en" ? "row" : "row-reverse",
        paddingTop: 12,
      },
      couponBox: {
        borderRadius: 4,
        gap: 2,
        borderStyle: "dashed",
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: colors.primaryLight,
        padding: 4,
        justifyContent: "center",
        flexDirection: "row",
      },
      couponTagIcon: { height: 12, width: 12 },
      offerMessageText: { fontWeight: "bold", fontSize: 8 },
      cartContainer: { margin: 16, marginBottom: 24, padding: 8 },
      cartIcon: { height: 36, width: 36 },
      cartIconCountContainer: {
        position: "absolute",
        bottom: 4,
        justifyContent: "center",
        alignItems: "center",
        right: 6,
        height: 18,
        width: 18,
        borderRadius: 9,
        backgroundColor: "#E60028",
      },
      cartItemCountText: { fontSize: 10, fontWeight: "bold", color: "white" },
      likeIconContainer:
        language === "en"
          ? {
              zIndex: 99,
              margin: 8,
              position: "absolute",
              top: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              zIndex: 99,
              margin: 8,
              position: "absolute",
              top: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            },
      addToCartIconContainer: language==='en' ?{
        zIndex: 999,
        margin: 8,
        position: "absolute",
        top: -32,
        right: -2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        height: 32,
        width: 32,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
      }:{
        zIndex: 999,
        margin: 8,
        position: "absolute",
        top: -32,
        left: -2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        height: 32,
        width: 32,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
      },
      headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black",
        padding: 10,
      },
      separator: {
        width: 1,
        height: "100%",
        backgroundColor: "white",
        marginHorizontal: 10,
      },
      language: {
        color: "white",
        fontSize: 16,
      },
      loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    })
  );
  return styles;
};

export default dynamicStyles;
