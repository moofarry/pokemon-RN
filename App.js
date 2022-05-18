import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { useCounter } from "./src/hooks/useCounter";
import { useFetch } from "./src/hooks/useFetch";

export default function App() {
  const defaultValue = 147;
  const { counter, increment, decrement, reset } = useCounter(defaultValue);
  const { data, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${counter}`
  );

  console.log(loading);
  return (
    <SafeAreaView style={styles.contend}>
      <View style={styles.container}>
        <Text style={styles.text.textTittle}>¡ Hello everyone !</Text>
        <Text style={styles.text.subTIttle}>
          Pokemon with id {counter} is {data?.name}
        </Text>

        {!loading ? (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `${data?.sprites.front_default}`,
            }}
          />
        ) : (
          <Text style={styles.text.loading}>Loading...</Text>
        )}

        {error && <Text style={styles.counter.text}>Pokemon not found </Text>}

        <View style={styles.counter}>
          <Pressable style={styles.counter.button} onPress={increment}>
            <Text style={styles.counter.textButton}> + 1 </Text>
          </Pressable>
          <Pressable style={styles.counter.button} onPress={reset}>
            <Text style={styles.counter.textButton}> Reset </Text>
          </Pressable>
          <Pressable style={styles.counter.button} onPress={decrement}>
            <Text style={styles.counter.textButton}> - 1 </Text>
          </Pressable>
        </View>
        <StatusBar style="light" />
      </View>
      <SafeAreaView style={styles.safeAreaView} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contend: { flex: 1 },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  safeAreaView: { flex: 0, backgroundColor: "#fff" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1F232A",
  },
  text: {
    textTittle: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
    },
    subTIttle: {
      marginTop: "2%",
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    error: {
      color: "##FF0100",
    },
    loading: {
      color: "#FF7676",
    },
  },

  counter: {
    flexDirection: "row",
    marginTop: "5%",
    text: {
      marginTop: "2%",
      color: "#B57EDC",
      fontSize: 20,
      fontWeight: "bold",
    },
    button: {
      alignSelf: "stretch",
      backgroundColor: "#fff",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#007BFF",
      marginLeft: "2%",
      marginRight: "2%",
    },
    textButton: {
      alignSelf: "center",
      color: "#007aff",
      fontSize: 14,
      fontWeight: "600",
      padding: 10,
    },
  },
});
