import { ChevronDown, ChevronUp, Maximize2 } from "lucide-react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getEvolutionColor, getEvolutionLabel } from "../constants/evolution";
import { getRiskColor, getRiskLabel } from "../constants/risk";
import { Colors, Spacing } from "../constants/theme";
import type { Diagnostic, Note } from "../store/types";
import Separator from "./Separator";

interface PatientDiagnosticsProps {
  diag: Diagnostic;
  index: number;
  openModal: (diag: Diagnostic, diagIndex: number) => void;
  annotations: Note[];
}

function PatientDiagnostics({
  diag,
  index,
  openModal,
  annotations,
}: PatientDiagnosticsProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiag = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleDiag}
        activeOpacity={0.85}
        style={styles.diagnosticItem}
      >
        <View style={styles.titleView}>
          <Image
            source={diag.img}
            resizeMode="cover"
            style={styles.diagnosticImg}
          />
          <View>
            <Text style={styles.conditionText}>{diag.condition}</Text>
            <Text style={styles.conditionDate}>{diag.date}</Text>
          </View>
        </View>
        {isOpen ? (
          <ChevronUp color={Colors.textMuted} size={20} />
        ) : (
          <ChevronDown color={Colors.textMuted} size={20} />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.viewExpanded}>
          <View style={styles.pictureView}>
            <Image
              source={diag.img}
              resizeMode="cover"
              style={styles.conditionPicture}
            />
            <TouchableOpacity
              onPress={() => openModal(diag, index)}
              activeOpacity={0.8}
              style={styles.maximizeButton}
            >
              <Maximize2 color={Colors.primary} size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.conditionInfosView}>
            <View style={styles.conditionInfos}>
              <View style={styles.conditionRow}>
                <Text style={styles.labels}>{t('diagnostics.zone')}</Text>
                <Text style={styles.textFont}>{diag.zone}</Text>
              </View>
              <View style={styles.conditionRow}>
                <Text style={styles.labels}>{t('diagnostics.evolution')}</Text>
                <Text
                  style={[
                    styles.textFont,
                    { color: getEvolutionColor(diag.evolution) },
                  ]}
                >
                  {getEvolutionLabel(diag.evolution)}
                </Text>
              </View>
              <View style={styles.conditionRow}>
                <Text style={styles.labels}>{t('diagnostics.risk')}</Text>
                <Text
                  style={[
                    styles.textFont,
                    { color: getRiskColor(diag.risque) },
                  ]}
                >
                  {getRiskLabel(diag.risque)}
                </Text>
              </View>
            </View>
            <Separator color={Colors.borderAlt} />
            {annotations.length > 0 ? (
              <Text style={styles.noteText}>
                <Text style={styles.textFont}>
                  {t('diagnostics.note')} {annotations[0]?.text}
                </Text>
              </Text>
            ) : (
              <Text style={styles.noNoteText}>{t('diagnostics.noNote')}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: Spacing.md,
  },
  diagnosticItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  diagnosticImg: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  conditionText: {
    fontWeight: "600",
    color: Colors.textPrimary,
    fontSize: 15,
  },
  conditionDate: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  viewExpanded: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  pictureView: {
    position: "relative",
  },
  conditionPicture: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  maximizeButton: {
    position: "absolute",
    top: 20,
    right: 8,
    padding: 4,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  conditionInfosView: {
    backgroundColor: Colors.surfaceAlt,
    width: "100%",
    marginVertical: 5,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.md,
    padding: 15,
  },
  conditionInfos: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  conditionRow: {
    alignItems: "center",
  },
  labels: {
    color: Colors.textLabel,
  },
  textFont: {
    fontWeight: "600",
  },
  noteText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  noNoteText: {
    color: Colors.textDisabled,
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default PatientDiagnostics;
