import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
} from "react-native";
import { useTranslation } from "react-i18next";
import Modal from "../components/Modal";
import PatientDiagnostics from "../components/PatientDiagnostics";
import PatientInfos from "../components/PatientInfos";
import { Colors, FontSize, Radius, Spacing } from "../constants/theme";
import type { RootStackParamList } from "../navigation/AppNavigator";
import type { Diagnostic, Note } from "../store/types";
import { useAppStore } from "../store/useAppStore";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = NativeStackScreenProps<RootStackParamList, "PatientFile">;

function PatientFileScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const { patient: routePatient } = route.params;

  const patients = useAppStore((state) => state.patients);
  const saveNotes = useAppStore((state) => state.saveNotes);

  const patient =
    patients.find((p) => p.id === routePatient.id) ?? routePatient;

  const [selectedDiag, setSelectedDiag] = useState<{
    diag: Diagnostic;
    diagIndex: number;
  } | null>(null);
  const [moleClicked, setMoleClicked] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [moleInfos, setMoleInfos] = useState<string>("");
  const [localNotes, setLocalNotes] = useState<Note[]>([]);

  const openModal = (diag: Diagnostic, diagIndex: number) => {
    setSelectedDiag({ diag, diagIndex });
    setLocalNotes(patient.diagnostic[diagIndex]?.annotations ?? []);
  };

  const closeModal = () => {
    setSelectedDiag(null);
    setMoleClicked(null);
    setMoleInfos("");
    setLocalNotes([]);
  };

  const handleValider = () => {
    if (selectedDiag) {
      saveNotes(patient.id, selectedDiag.diagIndex, localNotes);
    }
    closeModal();
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.background,
        flex: 1,
        padding: Spacing.xl,
      }}
    >
      <Text style={styles.patientName}>{patient.name}</Text>

      <PatientInfos patient={patient} />

      <Text style={styles.diagnosticsTitle}>{t('patientFile.diagnostics')}</Text>

      {patient.diagnostic.map((diag: Diagnostic, index: number) => {
        const annotations: Note[] = diag.annotations ?? [];
        return (
          <PatientDiagnostics
            diag={diag}
            key={index}
            index={index}
            openModal={openModal}
            annotations={annotations}
          />
        );
      })}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>{t('patientFile.back')}</Text>
      </TouchableOpacity>

      <Modal
        visible={selectedDiag !== null}
        selectedDiag={selectedDiag}
        moleClicked={moleClicked}
        setMoleClicked={setMoleClicked}
        moleInfos={moleInfos}
        setMoleInfos={setMoleInfos}
        localNotes={localNotes}
        setLocalNotes={setLocalNotes}
        onClose={closeModal}
        onValider={handleValider}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  patientName: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: Spacing.xxl,
  },
  diagnosticsTitle: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  backButton: {
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingVertical: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});

export default PatientFileScreen;
