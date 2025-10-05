
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { router } from "expo-router";
import { colors, commonStyles, shadowStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const profileOptions = [
    {
      title: "Settings",
      description: "App preferences and notifications",
      icon: "gear",
      route: "/settings",
      color: colors.primary,
    },
    {
      title: "Favourite Routes",
      description: "Your saved and frequently used routes",
      icon: "heart.fill",
      route: "/favorite-routes",
      color: colors.secondary,
    },
    {
      title: "Travel History",
      description: "View your past journeys and trips",
      icon: "clock.fill",
      route: "/travel-history",
      color: colors.accent,
    },
    {
      title: "Help & Support",
      description: "Get help and contact support",
      icon: "questionmark.circle.fill",
      route: "/help-support",
      color: colors.highlight,
    },
  ];

  const stats = [
    { label: "Total Trips", value: "47", icon: "bus.fill" },
    { label: "Favorite Route", value: "Route A", icon: "heart.fill" },
    { label: "Money Saved", value: "GHS 23.50", icon: "creditcard.fill" },
  ];

  const renderProfileOption = (option: typeof profileOptions[0], index: number) => (
    <Pressable
      key={index}
      style={[commonStyles.card, shadowStyles.small]}
      onPress={() => {
        console.log(`Navigating to ${option.route}`);
        router.push(option.route as any);
      }}
    >
      <View style={commonStyles.spaceBetween}>
        <View style={commonStyles.row}>
          <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
            <IconSymbol name={option.icon as any} size={20} color={colors.card} />
          </View>
          <View style={styles.optionContent}>
            <Text style={commonStyles.subtitle}>{option.title}</Text>
            <Text style={commonStyles.textSecondary}>{option.description}</Text>
          </View>
        </View>
        <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
      </View>
    </Pressable>
  );

  const renderStat = (stat: typeof stats[0], index: number) => (
    <View key={index} style={[styles.statCard, shadowStyles.small]}>
      <IconSymbol name={stat.icon as any} size={24} color={colors.primary} />
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea} edges={['top']}>
      <ScrollView
        style={commonStyles.container}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={[commonStyles.card, shadowStyles.medium, styles.profileHeader]}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={commonStyles.title}>John Doe</Text>
          <Text style={commonStyles.textSecondary}>Student ID: 10123456</Text>
          <Text style={commonStyles.textSecondary}>Faculty of Engineering</Text>
          
          <Pressable style={styles.editProfileButton}>
            <IconSymbol name="pencil" size={16} color={colors.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={commonStyles.subtitle}>Your Transport Stats</Text>
          <View style={styles.statsGrid}>
            {stats.map(renderStat)}
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsSection}>
          <Text style={commonStyles.subtitle}>Account & Preferences</Text>
          {profileOptions.map(renderProfileOption)}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={commonStyles.subtitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <Pressable
              style={[styles.quickActionCard, shadowStyles.small]}
              onPress={() => console.log('Emergency contact')}
            >
              <IconSymbol name="phone.fill" size={24} color={colors.secondary} />
              <Text style={styles.quickActionText}>Emergency</Text>
            </Pressable>
            <Pressable
              style={[styles.quickActionCard, shadowStyles.small]}
              onPress={() => console.log('Report issue')}
            >
              <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.highlight} />
              <Text style={styles.quickActionText}>Report Issue</Text>
            </Pressable>
            <Pressable
              style={[styles.quickActionCard, shadowStyles.small]}
              onPress={() => console.log('Share app')}
            >
              <IconSymbol name="square.and.arrow.up.fill" size={24} color={colors.accent} />
              <Text style={styles.quickActionText}>Share App</Text>
            </Pressable>
          </View>
        </View>

        {/* App Info */}
        <View style={[commonStyles.card, shadowStyles.small, styles.appInfo]}>
          <Text style={styles.appInfoTitle}>UG Campus Transport</Text>
          <Text style={commonStyles.textSecondary}>Version 1.0.0</Text>
          <Text style={commonStyles.textSecondary}>University of Ghana</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  statsSection: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 8,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
  },
  appInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
});
