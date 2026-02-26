import { X } from "lucide-react-native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors, FontSize, Radius, Spacing } from "../constants/theme";
import type { Diagnostic, Note } from "../store/types";
import ImageClick from "./ImageClick";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

type Props = {
  visible: boolean;
  selectedDiag: { diag: Diagnostic; diagIndex: number } | null;
  moleClicked: { x: number; y: number } | null;
  setMoleClicked: (v: { x: number; y: number } | null) => void;
  moleInfos: string;
  setMoleInfos: (v: string) => void;
  localNotes: Note[];
  setLocalNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  onClose: () => void;
  onValider: () => void;
};

function Modal({
  visible,
  selectedDiag,
  moleClicked,
  setMoleClicked,
  moleInfos,
  setMoleInfos,
  localNotes,
  setLocalNotes,
  onClose,
  onValider,
}: Props) {
  const { t } = useTranslation();
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {selectedDiag?.diag?.condition}
                </Text>
                <Pressable
                  onPress={onClose}
                  style={styles.headerClose}
                  accessibilityLabel={t("modal.closeLabel")}
                >
                  <X color={Colors.primary} size={18} />
                </Pressable>
              </View>
              <ScrollView
                contentContainerStyle={{
                  paddingVertical: Spacing.sm,
                  alignItems: "stretch",
                }}
                style={styles.scrollview}
              >
                {selectedDiag && <ImageClick
                  img={selectedDiag.diag.img}
                  setMoleClicked={setMoleClicked}
                  moleClicked={moleClicked}
                  confirmedNotes={localNotes}
                  onRemoveNote={(index: number) =>
                    setLocalNotes((prev) => prev.filter((_, i) => i !== index))
                  }
                />}
                {moleClicked ? (
                  <View style={styles.moleCard}>
                    <TextInput
                      style={styles.moleInput}
                      onChangeText={setMoleInfos}
                      value={moleInfos}
                      placeholder={t("modal.placeholder")}
                      placeholderTextColor={Colors.placeholder}
                    />
                    <View style={styles.moleButtonsRow}>
                      <Pressable
                        style={styles.cancelButton}
                        onPress={() => {
                          setMoleInfos("");
                          setMoleClicked(null);
                        }}
                      >
                        <Text style={styles.cancelText}>
                          {t("modal.cancel")}
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.okButton,
                          !moleInfos && { opacity: 0.5 },
                        ]}
                        onPress={() => {
                          if (moleInfos && moleClicked) {
                            setLocalNotes((prev) => [
                              ...prev,
                              {
                                id: Date.now().toString(),
                                text: moleInfos,
                                x: moleClicked.x,
                                y: moleClicked.y,
                              },
                            ]);
                          }
                          setMoleClicked(null);
                          setMoleInfos("");
                        }}
                        disabled={!moleInfos}
                      >
                        <Text style={styles.okText}>{t("modal.ok")}</Text>
                      </Pressable>
                    </View>
                  </View>
                ) : localNotes.length > 0 ? (
                  <View style={styles.moleCard}>
                    <Pressable style={styles.validerButton} onPress={onValider}>
                      <Text style={styles.validerText}>
                        {t("modal.validate")}
                      </Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.indicatorView}>
                    <Text style={styles.indicatorText}>
                      {t("modal.instruction")}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.overlay,
  },
  modalView: {
    width: screenWidth - 40,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    maxHeight: screenHeight * 0.9,
    padding: Spacing.md,
    alignItems: "stretch",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: Spacing.sm,
    paddingRight: Spacing.sm,
  },
  headerClose: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: Spacing.sm,
    borderRadius: Radius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  modalTitle: {
    flex: 1,
    paddingLeft: Spacing.md,
    fontSize: FontSize.base,
    fontWeight: "700",
    color: Colors.primary,
  },
  moleCard: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: Radius.xl,
    padding: Spacing.md,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  moleInput: {
    width: "100%",
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: "rgba(240,240,240,0.9)",
    paddingHorizontal: Spacing.md + 2,
    fontSize: FontSize.base,
    color: "#333",
  },
  moleButtonsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: Spacing.md,
  },
  cancelButton: {
    flex: 1,
    marginRight: Spacing.sm,
    backgroundColor: Colors.secondaryButton,
    paddingVertical: 10,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  okButton: {
    flex: 1,
    marginLeft: Spacing.sm,
    backgroundColor: Colors.dark,
    paddingVertical: 10,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  cancelText: {
    color: Colors.surface,
    fontSize: FontSize.base,
    fontWeight: "600",
  },
  okText: {
    color: Colors.surface,
    fontSize: FontSize.base,
    fontWeight: "600",
  },
  validerButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  validerText: {
    color: Colors.surface,
    fontSize: FontSize.base,
    fontWeight: "700",
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollview: {
    width: "100%",
  },
  indicatorView: {
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  indicatorText: {
    fontStyle: "italic",
    color: Colors.textLabel,
  },
});

export default Modal;
