import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import RestaurantItem from "../components/RestaurantItem";
import PaginationControls from "../components/PaginationControls";
import {
  fetchRestaurants,
  ApiResponse,
  Restaurant,
} from "../services/restaurantService";

export default function ExploreScreen() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [allPagesLoaded, setAllPagesLoaded] = useState(false);

  const loadData = async (page: number, isLoadingMore = false) => {
    if (isLoadingMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const responseData = await fetchRestaurants(page);
      // console.log(responseData); provjera u konzoli
      setData(responseData);

      if (page === 1) {
        setAllRestaurants(responseData.restaurants);
        setAllPagesLoaded(responseData.totalPages === 1);
      } else {
        setAllRestaurants((prev) => [...prev, ...responseData.restaurants]);
        setAllPagesLoaded(page >= responseData.totalPages);
      }

      // Update current page to match what was loaded
      setCurrentPage(responseData.currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, []);

  const loadNextPage = () => {
    if (
      data &&
      currentPage < data.totalPages &&
      !loadingMore &&
      !allPagesLoaded
    ) {
      loadData(currentPage + 1, true);
    }
  };

  const goToNextPage = () => {
    if (data && currentPage < data.totalPages) {
      loadData(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      loadData(currentPage - 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredRestaurants =
    searchQuery.trim() === ""
      ? allRestaurants
      : allRestaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleEndReached = () => {
    if (searchQuery.trim() === "") {
      loadNextPage();
    }
  };

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
            keyExtractor={(item: Restaurant) => item.id}
            renderItem={({ item }: { item: Restaurant }) => (
              <RestaurantItem item={item} />
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.3}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.headerTitle}>
                  {searchQuery.trim() !== "" ? "Search Results" : "Restaurants"}
                </Text>
                <Text style={styles.headerSubtitle}>
                  {searchQuery.trim() !== ""
                    ? `Found ${filteredRestaurants.length} restaurants matching "${searchQuery}"`
                    : `Showing ${allRestaurants.length} of ${data.totalRestaurants} restaurants`}
                </Text>
              </View>
            }
            ListFooterComponent={
              <>
                {loadingMore && (
                  <View style={styles.loadingMoreContainer}>
                    <ActivityIndicator size="small" color="#0000ff" />
                    <Text style={styles.loadingMoreText}>
                      Loading more restaurants...
                    </Text>
                  </View>
                )}
                <View style={{ height: 80 }} />
              </>
            }
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
              currentPage={currentPage}
              totalPages={data.totalPages}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
              disabled={allPagesLoaded}
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
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 70,
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
  loadingMoreContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loadingMoreText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
});
