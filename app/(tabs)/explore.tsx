import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";

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

const RestaurantItem = ({ item }: { item: Restaurant }) => (
  <View style={styles.restaurantItem}>
    <Image source={{ uri: item.icon_url }} style={styles.restaurantImage} />
    <View style={styles.restaurantInfo}>
      <Text style={styles.restaurantName}>{item.name}</Text>
      <Text style={styles.restaurantAddress}>{item.address}</Text>
      <View style={styles.ratingContainer}>
        {item.rating && <Text style={styles.rating}>Ratings: {item.rating}</Text>}
        {item.user_ratings_total && (
          <Text style={styles.ratingCount}>
            ({item.user_ratings_total} reviews)
          </Text>
        )}
      </View>
    </View>
  </View>
);

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps) => {
  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === 1 && styles.disabledButton,
        ]}
        onPress={onPrevious}
        disabled={currentPage === 1}
      >
        <Text style={styles.paginationButtonText}>Previous</Text>
      </TouchableOpacity>

      <Text style={styles.paginationText}>
        Page {currentPage} of {totalPages}
      </Text>

      <TouchableOpacity
        style={[
          styles.paginationButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={onNext}
        disabled={currentPage === totalPages}
      >
        <Text style={styles.paginationButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function TabTwoScreen() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const baseApiURL = "https://api.dinver.eu/api/app/restaurants/sample";

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const apiURL = `${baseApiURL}?page=${page}`;
      const response = await axios.get(apiURL);
      console.log(response.data);
      setData(response.data);

      if (page === 1) {
        setAllRestaurants(response.data.restaurants);
      } else {
        setAllRestaurants((prev) => [...prev, ...response.data.restaurants]);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const goToNextPage = () => {
    if (data && currentPage < data.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredRestaurants =
    searchQuery.trim() === ""
      ? data?.restaurants || []
      : allRestaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

  let content;
  if (loading && !data) {
    content = <ActivityIndicator size="large" color="#0000ff" />;
  } else if (data) {
    content = (
      <>
        <SearchBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          placeholder="Search restaurants..."
        />

        {filteredRestaurants.length > 0 ? (
          <FlatList
            data={filteredRestaurants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RestaurantItem item={item} />}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.headerTitle}>
                  {searchQuery.trim() !== "" ? "Search Results" : "Restaurants"}
                </Text>
                <Text style={styles.headerSubtitle}>
                  {searchQuery.trim() !== ""
                    ? `Found ${filteredRestaurants.length} restaurants matching "${searchQuery}"`
                    : `Showing ${data.restaurants.length} of ${data.totalRestaurants} restaurants`}
                </Text>
              </View>
            }
            ListFooterComponent={<View style={{ height: 80 }} />}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <Text style={styles.noResultsText}>
              No restaurants found matching "{searchQuery}"
            </Text>
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => setSearchQuery("")}
            >
              <Text style={styles.clearSearchButtonText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        )}

        {searchQuery.trim() === "" && (
          <View style={styles.paginationFooter}>
            <PaginationControls
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
            />
          </View>
        )}
      </>
    );
  } else {
    content = <Text style={styles.errorText}>Failed to load restaurants</Text>;
  }

  return <View style={styles.container}>{content}</View>;
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
  paginationFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  paginationButton: {
    backgroundColor: "#007bff",
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
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  clearSearchButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  clearSearchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
