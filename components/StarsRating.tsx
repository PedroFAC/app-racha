import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export type StarRatingProps = {
  onChange(rating: number): void;
  stars: boolean[];
};

export default function StarsRating({ onChange, stars }: StarRatingProps) {
  const theme = useThemeColor();

  const renderStar = (index: number) => {
    let iconName = "star-outline";
    if (stars[index]) iconName = "star-sharp";
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onChange(index)}
        hitSlop={20}
      >
        <Ionicons size={30} name={iconName} color="yellow"></Ionicons>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles(theme).starsContainer}>
      {stars.map((_, index) => renderStar(index))}
    </View>
  );
}

const styles = (theme: ColorType) =>
  StyleSheet.create({
    starsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
