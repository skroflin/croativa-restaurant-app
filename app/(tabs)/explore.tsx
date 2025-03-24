import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

// Define types for our data
interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number | null;
  user_ratings_total: number | null;
  icon_url: string;
  price_level: number | null;
}

interface ApiResponse {
  restaurants: Restaurant[];
  currentPage: number;
  totalPages: number;
  totalRestaurants: number;
}

export default function TabTwoScreen() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const apiURL = "https://api.dinver.eu/api/app/restaurants/sample";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiURL);
      console.log(response.data);
      setData(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <View style={styles.restaurantItem}>
      <Image source={{ uri: item.icon_url }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantAddress}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          {item.rating && <Text style={styles.rating}>⭐ {item.rating}</Text>}
          {item.user_ratings_total && (
            <Text style={styles.ratingCount}>
              ({item.user_ratings_total} reviews)
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data ? (
        <FlatList
          data={data.restaurants}
          keyExtractor={(item) => item.id}
          renderItem={renderRestaurantItem}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Restaurants</Text>
              <Text style={styles.headerSubtitle}>
                Showing {data.restaurants.length} of {data.totalRestaurants}{" "}
                restaurants
              </Text>
            </View>
          }
        />
      ) : (
        <Text style={styles.errorText}>Failed to load restaurants</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
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
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
