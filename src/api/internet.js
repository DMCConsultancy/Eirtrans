import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const checkInternet = async () => {
  const netinfo = await NetInfo.fetch()
  // console.log("netinfo",netinfo)
  return netinfo
};


