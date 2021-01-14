import * as React from "react";
import { View } from "./Themed";

const Separator = ({ topMargin }: { topMargin: number }) => {
  return <View style={{ marginTop: topMargin }}></View>;
};

export default Separator;
