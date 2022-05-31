import {
  SafeAreaView,
  Text,
  View,
  BackHandler,
  ActivityIndicator,
  Alert,
} from "react-native";
import Style from "../style/style";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Dialog,
  Portal,
  Provider,
  Modal,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

export default function AddScreen({ route, navigation }) {
  const [loadingScreen, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [resp, setResp] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [stat, setStat] = useState(false);
  const [textDialog, setTextDialog] = useState(null);
  const [alamat, setAlamat] = useState("");
  const { token, uid, nip } = route.params;

  if (nip !== undefined) {
    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        onDetailRes();

        navigation.setOptions({ title: "Ubah Data Karyawan!" });
      });

      return unsubscribe;
    }, [navigation]);
  }

  const onDetailRes = async () => {
    setLoading(true);
    await instanceApi
      .post("/detail_karyawan", {
        nip: nip,
      })
      .then(function (response) {
        console.log(response.data);
        setResp(response.data);
        setName(response.data.response.nama);
        setAlamat(response.data.response.alamat);
        setValueDrop(response.data.response.gender);
        setTextDate(response.data.response.tgl_lahir);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message);
        setResp(error.message);
        setLoading(false);
      });
  };
  const instanceApi = axios.create({
    baseURL: "https://gmedia.bz/DemoCase/main/",
    headers: {
      "Client-Service": "gmedia-recruitment",
      "Auth-Key": "demo-admin",
      "User-Id": uid,
      Token: token,
    },
  });

  const [open, setOpen] = useState(false);
  const [valueDrop, setValueDrop] = useState(null);
  const [items, setItems] = useState([
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ]);
  const [DateShow, SetDateShow] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [textDate, setTextDate] = useState("01-01-1997");

  const onUpdate = async () => {
    setLoading(true);
    await instanceApi
      .post("/update_karyawan", {
        nip: nip,
        nama: name,
        alamat: alamat,
        gender: valueDrop,
        tgl_lahir: textDate,
      })
      .then(function (response) {
        console.log(response.data);
        setResp(response.data);
        setName("");
        setAlamat("");
        setValueDrop(null);
        setTextDate("01-01-1997");
        setTextDialog("Update Data Berhasil!");
        setStat(true);
        setShowDialog(true);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message);
        setResp(error.message);
        setShowDialog(true);
        setTextDialog("Update Data Gagal!");
        setLoading(false);
      });
  };

  const onSubmit = async () => {
    setLoading(true);
    await instanceApi
      .post("/add_karyawan", {
        nama: name,
        alamat: alamat,
        gender: valueDrop,
        tgl_lahir: textDate,
      })
      .then(function (response) {
        console.log(response.data);
        setResp(response.data);
        setName("");
        setAlamat("");
        setValueDrop(null);
        setTextDate("01-01-1997");
        setTextDialog("Tambah Data Berhasil!");
        setStat(true);
        setShowDialog(true);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.message);
        setResp(error.message);
        setShowDialog(true);
        setTextDialog("Tambah Data Gagal!");
        setLoading(false);
      });
  };

  const currentDate = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentNow = selectedDate || DateShow;
    SetDateShow(currentNow);

    let dateTxt = new Date(currentNow);
    let Fdate =
      dateTxt.getDate() +
      "-" +
      (dateTxt.getMonth() + 1) +
      "-" +
      dateTxt.getFullYear();

    setTextDate(Fdate);
  };

  const move = () => {
    setShowDialog(false);
    navigation.navigate("HomeScreen", {
      token: token,
      uid: uid,
    });
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <Provider>
      <SafeAreaView Style={Style.container}>
        {loadingScreen ? <View Style={Style.PositionLoading}></View> : null}
        <Portal>
          <Dialog visible={showDialog}>
            <Dialog.Title>Warning!</Dialog.Title>
            <Dialog.Content>
              <Text>{textDialog}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={stat ? move : hideDialog}>
                {stat ? "Lanjut" : "Kembali"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <TextInput
          label="Nama"
          value={name}
          theme={{
            colors: { primary: "#0E6EB7", underlineColor: "transparent" },
          }}
          mode="outlined"
          blurOnSubmit={false}
          placeholder="Isi Nama"
          onChangeText={(value) => {
            setName(value);
            console.log(value);
          }}
          style={Style.TextInputNormal}
        />
        <TextInput
          label="Alamat"
          value={alamat}
          mode="outlined"
          theme={{
            colors: { primary: "#0E6EB7", underlineColor: "transparent" },
          }}
          multiline={true}
          blurOnSubmit={false}
          placeholder="Isi Alamat"
          onChangeText={(value) => {
            setAlamat(value);
            console.log(value);
          }}
          numberOfLines={10}
          style={Style.TextInputTextArea}
        />

        <DropDownPicker
          open={open}
          value={valueDrop}
          items={items}
          blurOnSubmit={false}
          setOpen={setOpen}
          setValue={setValueDrop}
          setItems={setItems}
          placeholder="Pilih Jenis Kelamin"
          containerStyle={{ margin: 16, width: 250 }}
          style={{
            backgroundColor: "#E6E6E6",
            borderColor: "#0E6EB7",
          }}
        />

        <Button
          icon="calendar"
          mode="outlined"
          theme={{
            colors: { primary: "#0E6EB7", underlineColor: "transparent" },
          }}
          blurOnSubmit={false}
          onPress={() => {
            setShowDatePicker(!showDatePicker.value);
          }}
          style={Style.BtnDatePicker}
        >
          {textDate}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={DateShow}
            mode="date"
            display="default"
            onChange={currentDate}
          />
        )}

        <Button
          mode="contained"
          theme={{
            colors: { primary: "#0E6EB7", underlineColor: "transparent" },
          }}
          onPress={nip !== undefined ? onUpdate : onSubmit}
          style={Style.btnSubmit}
        >
          {nip !== undefined ? "Update" : "Simpan"}
        </Button>

        <Portal>
          <Dialog visible={showDialog}>
            <Dialog.Title>Warning!</Dialog.Title>
            <Dialog.Content>
              <Text>{textDialog}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={stat ? move : hideDialog}>
                {stat ? "Lanjut" : "Kembali"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

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
