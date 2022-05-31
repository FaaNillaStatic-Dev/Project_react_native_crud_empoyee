import Style from "../style/style";
import { SafeAreaView, Image, ActivityIndicator, Text } from "react-native";
import { useEffect } from "react";
import { StackActions } from "@react-navigation/native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace("Login"));
    }, 3000);
  });

  return (
    <SafeAreaView Style={Style.containerSplash}>
      <Image
        style={{
          resizeMode: "contain",
          height: 250,
          width: 250,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          top: 150,
        }}
        source={require("../asset/gmedialogo.png")}
      />
      <ActivityIndicator
        size={"large"}
        color="#0E6EB7"
        style={{
          marginTop: 10,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          top: 150,
        }}
      />
    </SafeAreaView>
  );
}
