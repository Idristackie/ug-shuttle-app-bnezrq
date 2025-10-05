
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { router } from "expo-router";
import { colors, commonStyles, shadowStyles } from "@/styles/commonStyles";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const settingSections = [
    {
      title: "Notifications",
      items: [
        {
          title: "Push Notifications",
          description: "Receive alerts about shuttle arrivals and delays",
          type: "toggle",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          title: "Route Updates",
          description: "Get notified about route changes and service updates",
          type: "toggle",
          value: true,
          onToggle: () => console.log('Route updates toggled'),
        },
      ],
    },
    {
      title: "Location & Privacy",
      items: [
        {
          title: "Location Services",
          description: "Allow app to access your location for better service",
          type: "toggle",
          value: locationServices,
          onToggle: setLocationServices,
        },
        {
          title: "Data Usage",
          description: "Manage how the app uses your data",
          type: "navigation",
          onPress: () => console.log('Data usage settings'),
        },
      ],
    },
    {
      title: "App Preferences",
      items: [
        {
          title: "Dark Mode",
          description: "Switch between light and dark themes",
          type: "toggle",
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          title: "Auto Refresh",
          description: "Automatically update shuttle information",
          type: "toggle",
          value: autoRefresh,
          onToggle: setAutoRefresh,
        },
        {
          title: "Language",
          description: "English",
          type: "navigation",
          onPress: () => console.log('Language settings'),
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "Sync Data",
          description: "Backup your preferences and history",
          type: "navigation",
          onPress: () => console.log('Sync data'),
        },
        {
          title: "Clear Cache",
          description: "Free up storage space",
          type: "navigation",
          onPress: () => console.log('Clear cache'),
        },
        {
          title: "Sign Out",
          description: "Sign out of your account",
          type: "navigation",
          onPress: () => console.log('Sign out'),
          destructive: true,
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <View key={index} style={[commonStyles.card, shadowStyles.small]}>
      <View style={commonStyles.spaceBetween}>
        <View style={styles.settingContent}>
          <Text style={commonStyles.subtitle}>{item.title}</Text>
          <Text style={commonStyles.textSecondary}>{item.description}</Text>
        </View>
        {item.type === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.card}
          />
        ) : (
          <Pressable onPress={item.onPress}>
            <IconSymbol
              name="chevron.right"
              size={16}
              color={item.destructive ? colors.secondary : colors.textSecondary}
            />
          </Pressable>
        )}
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
        <Text style={commonStyles.title}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={commonStyles.container}
        contentContainerStyle={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(renderSettingItem)}
          </View>
        ))}

        {/* App Version */}
        <View style={[commonStyles.card, shadowStyles.small, styles.versionCard]}>
          <Text style={commonStyles.textSecondary}>App Version</Text>
          <Text style={commonStyles.text}>1.0.0 (Build 1)</Text>
        </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingContent: {
    flex: 1,
  },
  versionCard: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
