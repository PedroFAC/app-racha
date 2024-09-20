import { ColorType } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export type StarRatingProps = {
  disabled?: boolean;
  onChange(rating: number): void;
  stars: boolean[];
  starSize: number;
};

export default function StarsRating({
  onChange = () => {},
  stars,
  disabled,
  starSize = 30,
}: StarRatingProps) {
  const theme = useThemeColor();

  const renderStar = (index: number) => {
    let iconName = "star-outline";
    if (stars[index]) iconName = "star-sharp";
    return (
      <TouchableOpacity
        key={index}
        disabled={disabled}
        onPress={() => onChange(index)}
        hitSlop={20}
      >
        <Ionicons
          size={starSize}
          name={iconName}
          color={theme.starColor}
        ></Ionicons>
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
