import { Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FF8C42", dark: "#8C3503" }}
      headerImage={
        <Image
          source={require("@/assets/images/restaurant-header.png")}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          (*Insert catchy restaurant app name*)
        </ThemedText>
        <Ionicons name="restaurant" size={32} color="#FF8C42" />
      </ThemedView>

      <ThemedView style={styles.descriptionContainer}>
        <ThemedText style={styles.descriptionText}>
          Discover the best restaurants around you. Browse, search, and find
          your next favorite dining spot.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.featureContainer}>
        <ThemedView style={styles.featureItem}>
          <Ionicons name="search" size={24} color="#FF8C42" />
          <ThemedView style={styles.featureTextContainer}>
            <ThemedText type="subtitle">Search</ThemedText>
            <ThemedText>
              Find restaurants by name, cuisine, or location
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.featureItem}>
          <Ionicons name="star" size={24} color="#FF8C42" />
          <ThemedView style={styles.featureTextContainer}>
            <ThemedText type="subtitle">Ratings & Reviews</ThemedText>
            <ThemedText>See what others think about each restaurant</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.featureItem}>
          <Ionicons name="location" size={24} color="#FF8C42" />
          <ThemedView style={styles.featureTextContainer}>
            <ThemedText type="subtitle">Nearby Options</ThemedText>
            <ThemedText>Discover dining options close to you</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.getStartedContainer}>
        <ThemedText type="subtitle">Get Started</ThemedText>
        <ThemedText>
          Tap the Explore tab to browse restaurants and find your next meal!
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  headerImage: {
    height: 200,
    width: "100%",
    bottom: 0,
    position: "absolute",
    resizeMode: "cover",
  },
  descriptionContainer: {
    backgroundColor: "rgba(255, 140, 66, 0.1)",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  featureContainer: {
    gap: 16,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTextContainer: {
    flex: 1,
    gap: 4,
  },
  getStartedContainer: {
    gap: 8,
    marginBottom: 24,
    backgroundColor: "rgba(255, 140, 66, 0.1)",
    borderRadius: 8,
    padding: 16,
  },
});
