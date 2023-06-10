import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import wallpaper from "./assets/images/wallpaper.png";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import NotificationsList from "./src/components/NotificationsList";

import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import SwipeUpToOpen from "./src/components/SwipeUpToOpen";

export default function App() {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground source={wallpaper} style={styles.container}>
      {/* Notifications */}
      <NotificationsList
        ListHeaderComponent={() => (
          <Animated.View entering={SlideInUp} style={styles.header}>
            <Ionicons name="ios-lock-closed" size={20} color="white" />
            <Text style={styles.date}>{date.format("dddd, MMMM D")}</Text>
            <Text style={styles.time}>{date.format("h:mm")}</Text>
          </Animated.View>
        )}
      />

      <Animated.View entering={SlideInDown} style={styles.footer}>
        <View style={styles.icon}>
          <MaterialCommunityIcons name="flashlight" size={24} color={"white"} />
        </View>

        <SwipeUpToOpen />

        <View style={styles.icon}>
          <Ionicons name="ios-camera" size={24} color={"white"} />
        </View>
      </Animated.View>

      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },
  date: {
    color: "#FFECEC",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 28,
  },
  time: {
    fontSize: 82,
    fontWeight: "600",
    color: "#FFECEC",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingVertical: 10,
    paddingHorizontal: 44,
    height: 108,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
