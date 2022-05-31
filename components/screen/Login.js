import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import Style from "../style/style";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  Provider,
  Modal,
  DefaultTheme,
} from "react-native-paper";
import axios from "axios";

export default function Login({ navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [resState, setResState] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [textDialog, setTextDialog] = useState("");
  const [status, setStatus] = useState(false);
  const [loadingScreen, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  // useEffect(() => {
  //   onSubmit();
  // });
  const instanceAPI = axios.create({
    baseURL: "https://gmedia.bz/DemoCase/auth/",
    headers: {
      "Client-Service": "gmedia-recruitment",
      "Auth-Key": "demo-admin",
    },
  });

  console.log(resState);

  const onValidate = async () => {
    setLoading(true);
    try {
      await instanceAPI
        .post("/login", {
          username: `${username}`,
          password: `${password}`,
        })
        .then(function (response) {
          setResState(response.data);
          if (resState.metadata.status === 200) {
            setLoading(false);
            setShowDialog(true);
            setTextDialog(`${resState.metadata.message}`);
            setStatus(true);
          } else if (resState.metadata.status === 404) {
            setLoading(false);
            setShowDialog(true);
            setTextDialog(`${resState.metadata.message}`);
          }
        })
        .catch(function (error) {
          setLoading(false);
          setShowDialog(true);
          setTextDialog(`${error}`);
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const move = () => {
    navigation.navigate("HomeScreen", {
      token: resState.response.token,
      uid: resState.response.uid,
    });
    setStatus(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username != null) {
      if (password != null) {
        onValidate();
        setUsername(null);
        setPassword(null);
      } else {
        setShowDialog(true);
        setTextDialog("Password Masih Kosong!");
        setUsername(null);
        setPassword(null);
      }
    } else {
      setShowDialog(true);
      setTextDialog("Username Kosong!");
      setUsername(null);
      setPassword(null);
    }
  };

  const lastNameRef = useRef();

  return (
    <Provider>
      <SafeAreaView style={Style.container}>
        <Portal>
          <Dialog visible={showDialog}>
            <Dialog.Title>Warning!</Dialog.Title>
            <Dialog.Content>
              <Text>{textDialog}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={status ? move : hideDialog}>
                {status ? "Lanjut" : "Kembali"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Image
          style={{
            resizeMode: "contain",
            height: 150,
            width: 150,
            alignSelf: "center",
            top: 100,
          }}
          source={require("../asset/gmedialogo.png")}
        />

        <TextInput
          label="Username"
          value={username}
          mode="outlined"
          onSubmitEditing={() => {
            lastNameRef.current.focus();
          }}
          blurOnSubmit={false}
          placeholder="Isi Username"
          onChangeText={(value) => setUsername(value)}
          style={{
            margin: 16,
            alignSelf: "stretch",
            top: 100,
          }}
          theme={{
            colors: { primary: "#0E6EB7", underlineColor: "transparent" },
          }}
        />

        <TextInput
          ref={lastNameRef}
          onSubmitEditing={() => {}}
          blurOnSubmit={false}
          label="Password"
          value={password}
          mode="outlined"
          placeholder="Isi Password"
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={showPass}
          right={
            <TextInput.Icon
              name={showPass ? "eye" : "eye-off"}
              onPress={() => {
                setShowPass(!showPass);
              }}
            />
          }
          style={{
            margin: 16,
            alignSelf: "stretch",
            top: 100,
          }}
          theme={{
            colors: { primary: "#0E6EB7", underlineColor: "transparent" },
          }}
        />

        <Button
          mode="contained"
          color="#0E6EB7"
          onPress={onSubmit}
          style={Style.BtnLogin}
        >
          Login
        </Button>

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
