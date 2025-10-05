
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { router } from "expo-router";
import { colors, commonStyles, shadowStyles } from "@/styles/commonStyles";

export default function FavoriteRoutesScreen() {
  const [favoriteRoutes, setFavoriteRoutes] = useState([
    {
      id: "route-a",
      name: "Route A",
      title: "Main Gate - Engineering Block",
      duration: "15 min",
      fare: "GHS 2.00",
      frequency: "Every 10 min",
      status: "Active",
      color: colors.primary,
      lastUsed: "Today, 2:30 PM",
      usageCount: 23,
    },
    {
      id: "route-b",
      name: "Route B",
      title: "Main Gate - Hostel Complex",
      duration: "20 min",
      fare: "GHS 1.50",
      frequency: "Every 15 min",
      status: "Active",
      color: colors.secondary,
      lastUsed: "Yesterday, 6:45 PM",
      usageCount: 15,
    },
    {
      id: "route-c",
      name: "Route C",
      title: "Medical Center Circuit",
      duration: "25 min",
      fare: "GHS 1.00",
      frequency: "Every 20 min",
      status: "Limited",
      color: colors.accent,
      lastUsed: "3 days ago",
      usageCount: 8,
    },
  ]);

  const removeFavorite = (routeId: string) => {
    setFavoriteRoutes(prev => prev.filter(route => route.id !== routeId));
    console.log(`Removed route ${routeId} from favorites`);
  };

  const renderFavoriteRoute = (route: typeof favoriteRoutes[0], index: number) => (
    <View key={route.id} style={[commonStyles.card, shadowStyles.small]}>
      <View style={styles.routeHeader}>
        <View style={[styles.routeIcon, { backgroundColor: route.color }]}>
          <IconSymbol name="bus.fill" size={20} color={colors.card} />
        </View>
        <View style={styles.routeInfo}>
          <Text style={commonStyles.subtitle}>{route.title}</Text>
          <Text style={commonStyles.textSecondary}>{route.name}</Text>
        </View>
        <Pressable
          style={styles.removeButton}
          onPress={() => removeFavorite(route.id)}
        >
          <IconSymbol name="heart.fill" size={20} color={colors.secondary} />
        </Pressable>
      </View>

      <View style={styles.routeStats}>
        <View style={styles.statItem}>
          <IconSymbol name="clock.fill" size={14} color={colors.textSecondary} />
          <Text style={styles.statText}>{route.duration}</Text>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="creditcard.fill" size={14} color={colors.textSecondary} />
          <Text style={styles.statText}>{route.fare}</Text>
        </View>
        <View style={styles.statItem}>
          <IconSymbol name="repeat" size={14} color={colors.textSecondary} />
          <Text style={styles.statText}>{route.frequency}</Text>
        </View>
      </View>

      <View style={styles.usageInfo}>
        <View style={styles.usageItem}>
          <Text style={styles.usageLabel}>Last Used:</Text>
          <Text style={styles.usageValue}>{route.lastUsed}</Text>
        </View>
        <View style={styles.usageItem}>
          <Text style={styles.usageLabel}>Total Trips:</Text>
          <Text style={styles.usageValue}>{route.usageCount}</Text>
        </View>
      </View>

      <View style={styles.routeActions}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: colors.primary }]}
          onPress={() => console.log(`Track ${route.name}`)}
        >
          <IconSymbol name="location.fill" size={16} color={colors.card} />
          <Text style={styles.actionButtonText}>Track Now</Text>
        </Pressable>
        <Pressable
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
          onPress={() => console.log(`Set reminder for ${route.name}`)}
        >
          <IconSymbol name="bell.fill" size={16} color={colors.card} />
          <Text style={styles.actionButtonText}>Remind Me</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          style={[commonStyles.headerButton, shadowStyles.small]}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={20} color={colors.text} />
        </Pressable>
        <Text style={commonStyles.title}>Favorite Routes</Text>
        <Pressable
          style={[commonStyles.headerButton, shadowStyles.small]}
          onPress={() => console.log('Add new favorite')}
        >
          <IconSymbol name="plus" size={20} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={commonStyles.container}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favoriteRoutes.length > 0 ? (
          <>
            <View style={styles.summaryCard}>
              <Text style={commonStyles.subtitle}>Your Favorites</Text>
              <Text style={commonStyles.textSecondary}>
                You have {favoriteRoutes.length} favorite route{favoriteRoutes.length !== 1 ? 's' : ''}
              </Text>
            </View>

            {favoriteRoutes.map(renderFavoriteRoute)}
          </>
        ) : (
          <View style={styles.emptyState}>
            <IconSymbol name="heart" size={64} color={colors.textSecondary} />
            <Text style={commonStyles.title}>No Favorite Routes</Text>
            <Text style={commonStyles.textSecondary}>
              Add routes to your favorites for quick access
            </Text>
            <Pressable
              style={[commonStyles.button, { marginTop: 16 }]}
              onPress={() => router.push('/(tabs)/route')}
            >
              <Text style={commonStyles.buttonText}>Browse Routes</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    ...shadowStyles.small,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  routeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeInfo: {
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginVertical: 12,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  usageInfo: {
    marginBottom: 16,
  },
  usageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  usageLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  usageValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  routeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
});
