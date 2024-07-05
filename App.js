import { I18nManager, Platform } from "react-native";
import ProductList from "./src/screens/ProductList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "./src/providers/CartProvider";
import "./src/localization/localizationHandler";
import React from "react";
import { getItem } from "./src/utils/storage";
import { useTranslation } from "react-i18next";
const Stack = createStackNavigator();
export default function App() {
  const { i18n } = useTranslation();

  const initAppSettings = async () => {
    const storedLanguage = await getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
      if (storedLanguage === "ar") {
        const shouldBeRTL = true;
        if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== "web") {
          I18nManager.allowRTL(shouldBeRTL);
          I18nManager.forceRTL(shouldBeRTL);
          // Updates.reloadAsync();
        }
        // 

      }
    }
  };
  React.useEffect(() => {
    initAppSettings();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ProductList"
              component={ProductList}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}
