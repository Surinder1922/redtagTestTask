import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { setItem } from "../utils/storage";
import dynamicStyles from "../styles/global-styles";

const CustomHeader = () => {
  const { i18n } = useTranslation();
  const styles = dynamicStyles({language: i18n.language})
  const handleLanguageChange = React.useCallback(() => {
    setItem("language", i18n.language === "ar" ? "en" : "ar");
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  }, []);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.separator} />
      <Text onPress={handleLanguageChange} style={styles.language}>
        {i18n.language === "en" ? "AR" : "EN"}
      </Text>
    </View>
  );
};

export default CustomHeader;
