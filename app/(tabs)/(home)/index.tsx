
import React from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles, shadowStyles } from "@/styles/commonStyles";

export default function HomeScreen() {
  const quickActions = [
    {
      title: "Find Shuttle",
      description: "Locate nearby shuttles",
      icon: "bus.fill",
      color: colors.primary,
    },
    {
      title: "Popular Routes",
      description: "Most used campus routes",
      icon: "star.fill",
      color: colors.secondary,
    },
    {
      title: "Live Updates",
      description: "Real-time shuttle status",
      icon: "clock.fill",
      color: colors.accent,
    },
    {
      title: "Emergency",
      description: "Campus security contact",
      icon: "exclamationmark.triangle.fill",
      color: colors.highlight,
    },
  ];

  const announcements = [
    {
      title: "Service Update",
      message: "Shuttle service extended until 10 PM during exam period",
      time: "2 hours ago",
      priority: "high",
    },
    {
      title: "New Route Added",
      message: "Direct shuttle from Main Gate to Engineering Block now available",
      time: "1 day ago",
      priority: "medium",
    },
  ];

  const renderQuickAction = (action: typeof quickActions[0], index: number) => (
    <Pressable
      key={index}
      style={[styles.quickActionCard, shadowStyles.small]}
      onPress={() => console.log(`Pressed ${action.title}`)}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
        <IconSymbol name={action.icon as any} size={24} color={colors.card} />
      </View>
      <Text style={styles.quickActionTitle}>{action.title}</Text>
      <Text style={styles.quickActionDescription}>{action.description}</Text>
    </Pressable>
  );

  const renderAnnouncement = (announcement: typeof announcements[0], index: number) => (
    <View key={index} style={[styles.announcementCard, shadowStyles.small]}>
      <View style={styles.announcementHeader}>
        <View style={[
          styles.priorityIndicator,
          { backgroundColor: announcement.priority === 'high' ? colors.secondary : colors.accent }
        ]} />
        <Text style={styles.announcementTitle}>{announcement.title}</Text>
        <Text style={styles.announcementTime}>{announcement.time}</Text>
      </View>
      <Text style={styles.announcementMessage}>{announcement.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "UG Campus Transport",
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.card,
          }}
        />
      )}
      <ScrollView
        style={commonStyles.container}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Header */}
        <View style={styles.welcomeHeader}>
          <Text style={commonStyles.title}>Welcome to UG Transport</Text>
          <Text style={commonStyles.textSecondary}>
            Your guide to University of Ghana campus transportation
          </Text>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Live Shuttle Status */}
        <View style={[commonStyles.card, shadowStyles.medium]}>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.subtitle}>Live Shuttle Status</Text>
            <IconSymbol name="arrow.clockwise" size={20} color={colors.primary} />
          </View>
          <View style={styles.shuttleStatus}>
            <View style={styles.shuttleItem}>
              <View style={[styles.statusDot, { backgroundColor: colors.accent }]} />
              <Text style={commonStyles.text}>Main Gate - Engineering: 3 min</Text>
            </View>
            <View style={styles.shuttleItem}>
              <View style={[styles.statusDot, { backgroundColor: colors.secondary }]} />
              <Text style={commonStyles.text}>Library - Hostel: 7 min</Text>
            </View>
            <View style={styles.shuttleItem}>
              <View style={[styles.statusDot, { backgroundColor: colors.highlight }]} />
              <Text style={commonStyles.text}>Medical Center: 12 min</Text>
            </View>
          </View>
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <Text style={commonStyles.subtitle}>Campus Announcements</Text>
          {announcements.map(renderAnnouncement)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  quickActionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  shuttleStatus: {
    marginTop: 12,
    gap: 8,
  },
  shuttleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  announcementCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  priorityIndicator: {
    width: 4,
    height: 16,
    borderRadius: 2,
  },
  announcementTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  announcementTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  announcementMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
