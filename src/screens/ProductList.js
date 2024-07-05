import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";
import { useCart } from "../providers/CartProvider";
import Loader from "../components/Loader";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CustomHeader from "../components/CustomHeader";
import { getProducts } from "../services/products";
import { colors } from "../styles/colors";
import dynamicStyles from "../styles/global-styles";
import CartComponent from "../components/CartComponent";

const INITIAL_LOAD_PRODUCT_COUNT = 8;
const LOAD_MORE_PRODUCT_COUNT = 4;

const ProductList = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [isLoading, setLoading] = useState(false);
  const styles = dynamicStyles({ language: i18n.language });
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: t("header_title"),
        headerRight: () => i18n.language === "en" && <CartComponent />,
        headerLeft: () => i18n.language === "ar" && <CartComponent />,

      });
    }, [t])
  );

  useEffect(() => {
    async function fetchProducts() {
      console.log("here ", i18n.language);
      setLoading(true);
      const products = await getProducts(i18n.language);
      if (products && products.length) {
        setDisplayedProducts(products.slice(0, INITIAL_LOAD_PRODUCT_COUNT));
        setAllProducts(products);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [i18n.language]);

  const handleOnEndReached = React.useCallback(() => {
    console.log("I am reached.....", loadingMore);
    if (loadingMore) return;
    setLoadingMore(true);
    setLoading(true);
    const currentLength = displayedProducts.length;
    const moreProducts = allProducts.slice(
      currentLength,
      currentLength + LOAD_MORE_PRODUCT_COUNT
    );
    setTimeout(() => {
      setLoading(false);
      setDisplayedProducts([...displayedProducts, ...moreProducts]);
      setLoadingMore(false);
    }, 3000);
  }, [displayedProducts, allProducts, loadingMore]);

  const handleLikeToggle = React.useCallback(
    (prodIndex) => {
      //INFO: Used productIndex because product id is not unique , otherwise better approach do the same with unique id/value instead Index :)
      setDisplayedProducts((prevProducts) =>
        prevProducts.map((product, index) =>
          index === prodIndex
            ? { ...product, isLiked: !product.isLiked }
            : product
        )
      );
    },
    [setDisplayedProducts]
  );

  const handleAddToCart = React.useCallback((product) => {
    addToCart(product);
  }, []);

  const Loading = React.useCallback(() => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={38} color={colors.primary} />
      </View>
    );
  }, []);

  return (
    <View style={styles.root}>
      <SafeAreaView />
      <CustomHeader />
      {isLoading && allProducts.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          columnWrapperStyle={{
            flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
          }}
          onEndReachedThreshold={0.1}
          nestedScrollEnabled
          contentContainerStyle={styles.productListContentContainer}
          keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
          numColumns={2}
          data={displayedProducts}
          renderItem={({ item, index }) => (
            <ProductListItem
              item={item}
              onPressLikeIcon={() => handleLikeToggle(index)}
              onPressAddToCart={handleAddToCart}
            />
          )}
          onEndReached={handleOnEndReached}
        />
      )}
      {isLoading && allProducts.length > 0 && (
        <View style={{ padding: 40 }}>
          <Loader />
        </View>
      )}
    </View>
  );
};

export default ProductList;
