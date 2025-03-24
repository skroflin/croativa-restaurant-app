import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (text: string) => void;
  searchQuery: string;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  searchQuery,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#666"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={onSearch}
        clearButtonMode="while-editing"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          onPress={() => onSearch("")}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
