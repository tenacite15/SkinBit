import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import PatientListItem from "../components/PatientListItem";
import { Colors, FontSize, Spacing } from "../constants/theme";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useAppStore } from "../store/useAppStore";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const patients = useAppStore((state) => state.patients);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.screenTitle}>{t('home.title')}</Text>
      {patients.map((patient) => {
        const isExpanded = expandedId === patient.id;
        return (
          <PatientListItem
            patient={patient}
            key={patient.id}
            isExpanded={isExpanded}
            onPress={() => toggleExpand(patient.id)}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  screenTitle: {
    fontSize: FontSize.xl,
    fontWeight: "bold",
    margin: Spacing.md,
    color: Colors.textPrimary,
  },
});

export default HomeScreen;
