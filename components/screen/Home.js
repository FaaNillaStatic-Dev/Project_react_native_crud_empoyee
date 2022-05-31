import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  BackHandler,
  Alert,
  Image,
} from "react-native";
import Style from "../style/style";
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  FAB,
  Dialog,
  Portal,
  Provider,
  Button,
  Paragraph,
  Modal,
} from "react-native-paper";
import ItemList from "./ItemList";
import axios from "axios";
import style from "../style/style";
import { Icon } from "@rneui/themed";

export default function Home({ route, navigation }) {
  const [dataRes, setDataRes] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [statNip, setStatNip] = useState(null);
  const { token, uid } = route.params;
  const [loadingScreen, setLoading] = useState(false);

  const instanceAPI = axios.create({
    baseURL: "https://gmedia.bz/DemoCase/main/",
    headers: {
      "Client-Service": "gmedia-recruitment",
      "Auth-Key": "demo-admin",
      "User-Id": uid,
      Token: token,
    },
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [backAction]);

  useEffect(() => {
    onFetch();
    const unsubscribe = navigation.addListener("focus", () => {
      setDataRes([]);
      onFetch();
    });

    return unsubscribe;
  }, [navigation]);

  const backAction = () => {
    Alert.alert("Warning", "Ingin menutup Aplikasi?", [
      {
        text: "Tidak",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Iya",
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
    return true;
  };

  const onFetch = async () => {
    setLoading(true);
    await instanceAPI
      .post("/list_karyawan")
      .then(function (response) {
        setDataRes(response.data.response);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };
  const deleteQuest = (value) => {
    setShowDialog(true);
    setStatNip(value);
  };

  const onDelete = async () => {
    setLoading(true);
    await instanceAPI
      .post("delete_karyawan", {
        nip: statNip,
      })
      .then(function (response) {
        console.log(response.data);
        setStatNip(null);
        onFetch();
      });
  };
  const onEdit = (value) => {
    navigation.navigate("AddScreen", {
      token: token,
      uid: uid,
      nip: value,
    });
  };

  const renderItem = ({ item }) => (
    <View>
      <ItemList data={item} onDel={deleteQuest} onUp={onEdit} />
    </View>
  );

  return (
    <Provider>
      <SafeAreaView style={Style.container}>
        <Portal>
          <Dialog visible={showDialog}>
            <Dialog.Title>Perigatan!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Apakah Anda Yakin ingin Menghapus Data ini?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                color="green"
                onPress={() => {
                  setShowDialog(false);
                  onDelete();
                }}
              >
                Iya
              </Button>
              <Button
                color="red"
                onPress={() => {
                  setShowDialog(false);
                }}
              >
                Batal
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={Style.TextHeader}>
          <Image
            style={{
              flex: 1,
              resizeMode: "contain",
              height: 75,
              width: 75,
              marginStart: 8,
              marginTop: 8,
              marginBottom: 8,
              alignSelf: "center",
              top: 8,
            }}
            source={require("../asset/gmedialogo.png")}
          />
          <Text style={style.styleTextHeader}>Data Karyawan Gmedia</Text>
        </View>
        <FlatList
          style={{ marginTop: 36, bottom: 0, marginBottom: 0, flex: 2 }}
          data={dataRes}
          renderItem={renderItem}
        />
        <FAB
          style={Style.PositionFAB}
          default
          icon="plus"
          color="#FFC947"
          onPress={() =>
            navigation.navigate("AddScreen", {
              token: token,
              uid: uid,
            })
          }
        />
        <Portal>
          <Modal
            visible={loadingScreen}
            contentContainerStyle={Style.modalStyle}
          >
            <ActivityIndicator size={"large"} color="#0E6EB7" />
            <Text style={Style.indicatorText}>Tunggu Sebentar..</Text>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}
