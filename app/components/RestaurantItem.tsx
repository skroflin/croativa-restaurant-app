import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Restaurant } from "../services/restaurantService";

interface RestaurantItemProps {
  item: Restaurant;
}

const RestaurantItem = ({ item }: RestaurantItemProps) => (
  <View style={styles.restaurantItem}>
    <Image source={{ uri: item.icon_url }} style={styles.restaurantImage} />
    <View style={styles.restaurantInfo}>
      <Text style={styles.restaurantName}>{item.name}</Text>
      <Text style={styles.restaurantAddress}>{item.address}</Text>
      <View style={styles.ratingContainer}>
        {item.rating && (
          <Text style={styles.rating}>Ratings: {item.rating}</Text>
        )}
        {item.user_ratings_total && (
          <Text style={styles.ratingCount}>
            ({item.user_ratings_total} reviews)
          </Text>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  restaurantItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 4,
  },
  ratingCount: {
    fontSize: 12,
    color: "#666",
  },
});

export default RestaurantItem;
