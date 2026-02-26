import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing } from "../constants/theme";
import type { Patient } from "../store/types";
import Separator from "./Separator";

interface PatientInfosProps {
  patient: Patient;
}

function PatientInfos({ patient }: PatientInfosProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>{t('patientInfos.age')}</Text>
        <Text style={styles.value}>{patient.age} ans</Text>
      </View>

      <Separator />

      <View style={styles.infoRow}>
        <Text style={styles.label}>{t('patientInfos.condition')}</Text>
        <Text style={styles.value}>{patient.condition}</Text>
      </View>

      <Separator />

      <View style={styles.infoRow}>
        <Text style={styles.label}>{t('patientInfos.lastVisit')}</Text>
        <Text style={styles.value}>{patient.lastVisit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: Spacing.lg,
    gap: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: Spacing.xxl,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  value: {
    color: Colors.textSecondary,
  },
});

export default PatientInfos;
