
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, shadowStyles } from "@/styles/commonStyles";

export default function RouteScreen() {
  const [selectedRoute, setSelectedRoute] = useState("route-a");

  const routes = [
    {
      id: "route-a",
      name: "Route A",
      title: "Main Gate - Engineering Block",
      duration: "15 min",
      fare: "GHS 2.00",
      frequency: "Every 10 min",
      status: "Active",
      color: colors.primary,
      stops: [
        { name: "Main Gate", time: "0 min", status: "departure" },
        { name: "Administration Block", time: "3 min", status: "stop" },
        { name: "Library", time: "7 min", status: "stop" },
        { name: "Science Block", time: "12 min", status: "stop" },
        { name: "Engineering Block", time: "15 min", status: "arrival" },
      ],
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
      stops: [
        { name: "Main Gate", time: "0 min", status: "departure" },
        { name: "Administration Block", time: "4 min", status: "stop" },
        { name: "Library", time: "8 min", status: "stop" },
        { name: "Sports Complex", time: "14 min", status: "stop" },
        { name: "Hostel Complex", time: "20 min", status: "arrival" },
      ],
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
      stops: [
        { name: "Main Gate", time: "0 min", status: "departure" },
        { name: "Medical Center", time: "8 min", status: "stop" },
        { name: "Faculty of Arts", time: "15 min", status: "stop" },
        { name: "Business School", time: "20 min", status: "stop" },
        { name: "Main Gate", time: "25 min", status: "arrival" },
      ],
    },
  ];

  const selectedRouteData = routes.find(route => route.id === selectedRoute);

  const renderRouteTab = (route: typeof routes[0]) => (
    <Pressable
      key={route.id}
      style={[
        styles.routeTab,
        selectedRoute === route.id && styles.routeTabActive,
        { borderColor: route.color },
        selectedRoute === route.id && { backgroundColor: route.color },
      ]}
      onPress={() => setSelectedRoute(route.id)}
    >
      <Text style={[
        styles.routeTabText,
        selectedRoute === route.id && styles.routeTabTextActive,
      ]}>
        {route.name}
      </Text>
    </Pressable>
  );

  const renderStop = (stop: typeof selectedRouteData.stops[0], index: number, isLast: boolean) => (
    <View key={index} style={styles.stopContainer}>
      <View style={styles.stopTimeline}>
        <View style={[
          styles.stopDot,
          {
            backgroundColor: stop.status === 'departure' ? colors.accent :
                           stop.status === 'arrival' ? colors.secondary :
                           colors.primary
          }
        ]} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.stopContent}>
        <View style={commonStyles.spaceBetween}>
          <Text style={styles.stopName}>{stop.name}</Text>
          <Text style={styles.stopTime}>{stop.time}</Text>
        </View>
        <View style={styles.stopStatus}>
          <IconSymbol
            name={stop.status === 'departure' ? 'play.circle.fill' :
                  stop.status === 'arrival' ? 'checkmark.circle.fill' :
                  'circle.fill'}
            size={12}
            color={colors.textSecondary}
          />
          <Text style={styles.stopStatusText}>
            {stop.status === 'departure' ? 'Departure Point' :
             stop.status === 'arrival' ? 'Final Destination' :
             'Bus Stop'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <ScrollView
        style={commonStyles.container}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={commonStyles.title}>Campus Routes</Text>
          <Text style={commonStyles.textSecondary}>
            Explore all available shuttle routes on campus
          </Text>
        </View>

        {/* Route Tabs */}
        <View style={styles.routeTabs}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tabsRow}>
              {routes.map(renderRouteTab)}
            </View>
          </ScrollView>
        </View>

        {/* Selected Route Details */}
        {selectedRouteData && (
          <>
            {/* Route Info Card */}
            <View style={[commonStyles.card, shadowStyles.medium]}>
              <View style={styles.routeHeader}>
                <View style={[styles.routeIcon, { backgroundColor: selectedRouteData.color }]}>
                  <IconSymbol name="bus.fill" size={24} color={colors.card} />
                </View>
                <View style={styles.routeInfo}>
                  <Text style={commonStyles.subtitle}>{selectedRouteData.title}</Text>
                  <Text style={commonStyles.textSecondary}>{selectedRouteData.name}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: selectedRouteData.status === 'Active' ? colors.accent : colors.highlight }
                ]}>
                  <Text style={styles.statusText}>{selectedRouteData.status}</Text>
                </View>
              </View>

              <View style={styles.routeStats}>
                <View style={styles.statItem}>
                  <IconSymbol name="clock.fill" size={16} color={colors.textSecondary} />
                  <Text style={styles.statText}>{selectedRouteData.duration}</Text>
                </View>
                <View style={styles.statItem}>
                  <IconSymbol name="creditcard.fill" size={16} color={colors.textSecondary} />
                  <Text style={styles.statText}>{selectedRouteData.fare}</Text>
                </View>
                <View style={styles.statItem}>
                  <IconSymbol name="repeat" size={16} color={colors.textSecondary} />
                  <Text style={styles.statText}>{selectedRouteData.frequency}</Text>
                </View>
              </View>
            </View>

            {/* Route Map Placeholder */}
            <View style={[commonStyles.card, shadowStyles.small]}>
              <View style={commonStyles.spaceBetween}>
                <Text style={commonStyles.subtitle}>Route Map</Text>
                <IconSymbol name="map.fill" size={20} color={colors.primary} />
              </View>
              <View style={styles.mapPlaceholder}>
                <IconSymbol name="map" size={48} color={colors.textSecondary} />
                <Text style={styles.mapPlaceholderText}>
                  Interactive maps are not supported in Natively web environment.
                  {'\n'}Route visualization would be available in the mobile app.
                </Text>
              </View>
            </View>

            {/* Route Stops */}
            <View style={[commonStyles.card, shadowStyles.small]}>
              <Text style={commonStyles.subtitle}>Route Stops</Text>
              <View style={styles.stopsContainer}>
                {selectedRouteData.stops.map((stop, index) =>
                  renderStop(stop, index, index === selectedRouteData.stops.length - 1)
                )}
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <Pressable
                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                onPress={() => console.log('Track shuttle')}
              >
                <IconSymbol name="location.fill" size={20} color={colors.card} />
                <Text style={styles.actionButtonText}>Track Shuttle</Text>
              </Pressable>
              <Pressable
                style={[styles.actionButton, { backgroundColor: colors.secondary }]}
                onPress={() => console.log('Set reminder')}
              >
                <IconSymbol name="bell.fill" size={20} color={colors.card} />
                <Text style={styles.actionButtonText}>Set Reminder</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  routeTabs: {
    marginBottom: 24,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  routeTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: colors.card,
  },
  routeTabActive: {
    // backgroundColor set dynamically
  },
  routeTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  routeTabTextActive: {
    color: colors.card,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  routeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeInfo: {
    flex: 1,
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
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
  mapPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: 12,
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  stopsContainer: {
    marginTop: 16,
  },
  stopContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stopTimeline: {
    alignItems: 'center',
    marginRight: 16,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    height: 32,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  stopContent: {
    flex: 1,
  },
  stopName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  stopTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  stopStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  stopStatusText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
});
