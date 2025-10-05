
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { router } from "expo-router";
import { colors, commonStyles, shadowStyles } from "@/styles/commonStyles";

export default function TravelHistoryScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const periods = [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "all", label: "All Time" },
  ];

  const travelHistory = [
    {
      id: "1",
      route: "Route A",
      title: "Main Gate → Engineering Block",
      date: "Today",
      time: "2:30 PM",
      duration: "15 min",
      fare: "GHS 2.00",
      status: "Completed",
      color: colors.primary,
    },
    {
      id: "2",
      route: "Route A",
      title: "Engineering Block → Main Gate",
      date: "Today",
      time: "11:45 AM",
      duration: "15 min",
      fare: "GHS 2.00",
      status: "Completed",
      color: colors.primary,
    },
    {
      id: "3",
      route: "Route B",
      title: "Main Gate → Hostel Complex",
      date: "Yesterday",
      time: "6:45 PM",
      duration: "20 min",
      fare: "GHS 1.50",
      status: "Completed",
      color: colors.secondary,
    },
    {
      id: "4",
      route: "Route C",
      title: "Medical Center Circuit",
      date: "Yesterday",
      time: "3:20 PM",
      duration: "25 min",
      fare: "GHS 1.00",
      status: "Completed",
      color: colors.accent,
    },
    {
      id: "5",
      route: "Route A",
      title: "Main Gate → Engineering Block",
      date: "2 days ago",
      time: "9:15 AM",
      duration: "15 min",
      fare: "GHS 2.00",
      status: "Completed",
      color: colors.primary,
    },
  ];

  const stats = {
    totalTrips: travelHistory.length,
    totalSpent: travelHistory.reduce((sum, trip) => sum + parseFloat(trip.fare.replace('GHS ', '')), 0),
    mostUsedRoute: "Route A",
    averageDuration: "18 min",
  };

  const renderPeriodFilter = (period: typeof periods[0]) => (
    <Pressable
      key={period.id}
      style={[
        styles.periodButton,
        selectedPeriod === period.id && styles.periodButtonActive,
      ]}
      onPress={() => setSelectedPeriod(period.id)}
    >
      <Text style={[
        styles.periodText,
        selectedPeriod === period.id && styles.periodTextActive,
      ]}>
        {period.label}
      </Text>
    </Pressable>
  );

  const renderTripItem = (trip: typeof travelHistory[0], index: number) => (
    <View key={trip.id} style={[commonStyles.card, shadowStyles.small]}>
      <View style={styles.tripHeader}>
        <View style={[styles.routeIcon, { backgroundColor: trip.color }]}>
          <IconSymbol name="bus.fill" size={16} color={colors.card} />
        </View>
        <View style={styles.tripInfo}>
          <Text style={commonStyles.subtitle}>{trip.title}</Text>
          <Text style={commonStyles.textSecondary}>{trip.route}</Text>
        </View>
        <View style={styles.tripTime}>
          <Text style={styles.timeText}>{trip.time}</Text>
          <Text style={styles.dateText}>{trip.date}</Text>
        </View>
      </View>

      <View style={styles.tripDetails}>
        <View style={styles.detailItem}>
          <IconSymbol name="clock.fill" size={14} color={colors.textSecondary} />
          <Text style={styles.detailText}>{trip.duration}</Text>
        </View>
        <View style={styles.detailItem}>
          <IconSymbol name="creditcard.fill" size={14} color={colors.textSecondary} />
          <Text style={styles.detailText}>{trip.fare}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: colors.accent }]}>
          <Text style={styles.statusText}>{trip.status}</Text>
        </View>
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
        <Text style={commonStyles.title}>Travel History</Text>
        <Pressable
          style={[commonStyles.headerButton, shadowStyles.small]}
          onPress={() => console.log('Export history')}
        >
          <IconSymbol name="square.and.arrow.up" size={20} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={commonStyles.container}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Filters */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersRow}>
              {periods.map(renderPeriodFilter)}
            </View>
          </ScrollView>
        </View>

        {/* Stats Summary */}
        <View style={[commonStyles.card, shadowStyles.medium, styles.statsCard]}>
          <Text style={commonStyles.subtitle}>Travel Summary</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalTrips}</Text>
              <Text style={styles.statLabel}>Total Trips</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>GHS {stats.totalSpent.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.mostUsedRoute}</Text>
              <Text style={styles.statLabel}>Most Used</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.averageDuration}</Text>
              <Text style={styles.statLabel}>Avg Duration</Text>
            </View>
          </View>
        </View>

        {/* Trip History */}
        <View style={styles.historySection}>
          <Text style={commonStyles.subtitle}>Recent Trips</Text>
          {travelHistory.map(renderTripItem)}
        </View>

        {/* Load More */}
        <Pressable
          style={[styles.loadMoreButton, shadowStyles.small]}
          onPress={() => console.log('Load more trips')}
        >
          <Text style={styles.loadMoreText}>Load More Trips</Text>
          <IconSymbol name="arrow.down.circle" size={16} color={colors.primary} />
        </Pressable>
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
  filtersContainer: {
    marginBottom: 16,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 4,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  periodTextActive: {
    color: colors.card,
  },
  statsCard: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  historySection: {
    marginBottom: 24,
  },
  tripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  routeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripInfo: {
    flex: 1,
  },
  tripTime: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
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
  loadMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  loadMoreText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
});
