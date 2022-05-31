import React from "react";
import { Image, View, Text } from "react-native";
import Styles from "../style/style";
import { Icon } from "@rneui/themed";
import style from "../style/style";

export default function ItemList({ data, onDel, onUp }) {
  console.log(data.nama);
  return (
    <View style={Styles.Box} key={data.nip}>
      <Icon
        reverse
        name="person-circle-outline"
        type="ionicon"
        color="#517fa4"
        containerStyle={style.PicProfil}
      />
      <View style={Styles.TextFlex}>
        <Text style={Styles.TextItemTitle}>NIP</Text>
        <Text style={Styles.TextItem}>{data.nip}</Text>
        <Text style={Styles.TextItemTitle}>Nama</Text>
        <Text style={Styles.TextItem}>{data.nama}</Text>
        <Text style={Styles.TextItemTitle}>Alamat</Text>
        <Text style={Styles.TextItem}>{data.alamat}</Text>
      </View>

      <Icon
        name="edit"
        type="material-icons"
        containerStyle={Styles.iconStyle}
        color="#0A1931"
        onPress={() => onUp(data.nip)}
      />
      <Icon
        name="delete"
        type="material-icons"
        containerStyle={Styles.iconStyle}
        color="#A50021"
        onPress={() => onDel(data.nip)}
      />
    </View>
  );
}
