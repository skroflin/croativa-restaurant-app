import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  disabled = false,
}: PaginationControlsProps) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          (currentPage === 1 || disabled) && styles.disabledButton,
        ]}
        onPress={onPrevious}
        disabled={currentPage === 1 || disabled}
      >
        <Text style={styles.paginationButtonText}>
          <AntDesign name="caretleft" size={24} />
        </Text>
      </TouchableOpacity>

      <Text style={styles.paginationText}>
        {disabled
          ? "All restaurants loaded"
          : `Page ${currentPage} of ${totalPages}`}
      </Text>

      <TouchableOpacity
        style={[
          styles.paginationButton,
          (currentPage === totalPages || disabled) && styles.disabledButton,
        ]}
        onPress={onNext}
        disabled={currentPage === totalPages || disabled}
      >
        <Text style={styles.paginationButtonText}>
          <AntDesign name="caretright" size={24} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  paginationButton: {
    backgroundColor: "#FF8C42",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  paginationButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  paginationText: {
    fontSize: 14,
  },
});

export default PaginationControls;
