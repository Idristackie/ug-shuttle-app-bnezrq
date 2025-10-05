
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, shadowStyles } from "@/styles/commonStyles";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All", icon: "list.bullet" },
    { id: "routes", label: "Routes", icon: "map" },
    { id: "stops", label: "Stops", icon: "mappin" },
    { id: "locations", label: "Locations", icon: "building.2" },
  ];

  const searchResults = [
    {
      type: "route",
      title: "Main Gate to Engineering Block",
      subtitle: "Route A - 15 min journey",
      description: "Stops: Main Gate, Library, Science Block, Engineering",
      status: "Active",
      fare: "GHS 2.00",
    },
    {
      type: "stop",
      title: "Library Bus Stop",
      subtitle: "Central Campus",
      description: "Next shuttle in 5 minutes",
      status: "Active",
      routes: ["Route A", "Route B", "Route C"],
    },
    {
      type: "location",
      title: "Engineering Block",
      subtitle: "Academic Building",
      description: "Faculty of Engineering Sciences",
      status: "Open",
      nearestStop: "Engineering Stop - 50m",
    },
    {
      type: "route",
      title: "Hostel Shuttle Service",
      subtitle: "Route B - 20 min journey",
      description: "Stops: Main Gate, Admin, Library, Hostel Complex",
      status: "Active",
      fare: "GHS 1.50",
    },
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        result.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || result.type === selectedFilter.slice(0, -1);
    return matchesQuery && matchesFilter;
  });

  const renderFilter = (filter: typeof filters[0]) => (
    <Pressable
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.filterButtonActive,
        shadowStyles.small,
      ]}
      onPress={() => setSelectedFilter(filter.id)}
    >
      <IconSymbol
        name={filter.icon as any}
        size={16}
        color={selectedFilter === filter.id ? colors.card : colors.primary}
      />
      <Text style={[
        styles.filterText,
        selectedFilter === filter.id && styles.filterTextActive,
      ]}>
        {filter.label}
      </Text>
    </Pressable>
  );

  const renderSearchResult = (result: typeof searchResults[0], index: number) => (
    <Pressable
      key={index}
      style={[commonStyles.card, shadowStyles.small]}
      onPress={() => console.log(`Selected ${result.title}`)}
    >
      <View style={commonStyles.spaceBetween}>
        <View style={styles.resultIcon}>
          <IconSymbol
            name={result.type === 'route' ? 'bus.fill' : result.type === 'stop' ? 'mappin.circle.fill' : 'building.2.fill'}
            size={20}
            color={colors.primary}
          />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: result.status === 'Active' ? colors.accent : colors.textSecondary }]}>
          <Text style={styles.statusText}>{result.status}</Text>
        </View>
      </View>
      
      <Text style={commonStyles.subtitle}>{result.title}</Text>
      <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>{result.subtitle}</Text>
      <Text style={commonStyles.textSecondary}>{result.description}</Text>
      
      {result.fare && (
        <View style={styles.fareContainer}>
          <IconSymbol name="creditcard.fill" size={16} color={colors.secondary} />
          <Text style={styles.fareText}>{result.fare}</Text>
        </View>
      )}
      
      {result.routes && (
        <View style={styles.routesContainer}>
          <Text style={styles.routesLabel}>Available Routes:</Text>
          <View style={styles.routesList}>
            {result.routes.map((route, idx) => (
              <View key={idx} style={styles.routeTag}>
                <Text style={styles.routeTagText}>{route}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      
      {result.nearestStop && (
        <View style={styles.nearestStopContainer}>
          <IconSymbol name="location.fill" size={16} color={colors.accent} />
          <Text style={styles.nearestStopText}>{result.nearestStop}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <ScrollView
        style={commonStyles.container}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Header */}
        <View style={styles.searchHeader}>
          <Text style={commonStyles.title}>Search Campus Transport</Text>
          <Text style={commonStyles.textSecondary}>
            Find routes, stops, and campus locations
          </Text>
        </View>

        {/* Search Input */}
        <View style={[styles.searchContainer, shadowStyles.small]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routes, stops, or locations..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>

        {/* Filter Buttons */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersRow}>
              {filters.map(renderFilter)}
            </View>
          </ScrollView>
        </View>

        {/* Search Results */}
        <View style={styles.resultsContainer}>
          <Text style={commonStyles.subtitle}>
            {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
          </Text>
          {filteredResults.map(renderSearchResult)}
        </View>

        {/* Popular Searches */}
        {searchQuery.length === 0 && (
          <View style={styles.popularSearches}>
            <Text style={commonStyles.subtitle}>Popular Searches</Text>
            <View style={styles.popularTags}>
              {["Engineering Block", "Library", "Main Gate", "Hostel", "Medical Center"].map((tag, index) => (
                <Pressable
                  key={index}
                  style={styles.popularTag}
                  onPress={() => setSearchQuery(tag)}
                >
                  <Text style={styles.popularTagText}>{tag}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filtersContainer: {
    marginBottom: 24,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  filterTextActive: {
    color: colors.card,
  },
  resultsContainer: {
    marginBottom: 24,
  },
  resultIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  fareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  fareText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
  routesContainer: {
    marginTop: 8,
  },
  routesLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  routesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  routeTag: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  routeTagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  nearestStopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  nearestStopText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '500',
  },
  popularSearches: {
    marginBottom: 24,
  },
  popularTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  popularTag: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  popularTagText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});
