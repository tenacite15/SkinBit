import { NavigationProp } from "@react-navigation/native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, FontSize, Radius, Spacing } from "../constants/theme";
import type { RootStackParamList } from "../navigation/AppNavigator";
import type { Patient } from "../store/types";

interface PatientListItemProps {
  patient: Patient;
  isExpanded: boolean;
  onPress: () => void;
  navigation: NavigationProp<RootStackParamList>;
}

function PatientListItem({
  patient,
  isExpanded,
  onPress,
  navigation,
}: PatientListItemProps) {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      key={patient.id}
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.container}
    >
      <View style={styles.headerView}>
        <Text style={styles.patientName}>{patient.name}</Text>
        <Text>
          {isExpanded ? (
            <ChevronUp color={Colors.textMuted} size={20} />
          ) : (
            <ChevronDown color={Colors.textMuted} size={20} />
          )}
        </Text>
      </View>

      {isExpanded && (
        <View style={styles.viewExpanded}>
          <View style={styles.viewMainInfos}>
            <View style={styles.viewInfo}>
              <Text style={[styles.label, styles.colorText]}>{t('patientList.age')} </Text>
              <Text style={styles.colorText}>{patient.age} ans</Text>
            </View>
            <View style={styles.viewInfo}>
              <Text style={[styles.label, styles.colorText]}>{t('patientList.condition')} </Text>
              <Text style={styles.colorText}>{patient.condition}</Text>
            </View>
            <View style={styles.viewInfo}>
              <Text style={[styles.label, styles.colorText]}>
                {t('patientList.lastVisit')}{" "}
              </Text>
              <Text style={styles.colorText}>{patient.lastVisit}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PatientFile", { patient })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{t('patientList.seeFile')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  patientName: {
    fontSize: FontSize.base,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  viewExpanded: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  viewMainInfos: {
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  viewInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
  },
  colorText: {
    color: Colors.textSecondary,
  },
  button: {
    marginTop: 14,
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.surface,
    fontWeight: "600",
    fontSize: FontSize.md,
  },
});

export default PatientListItem;
