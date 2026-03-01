import { X } from "lucide-react-native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BlurView } from "expo-blur";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal as RNModal,
  StyleSheet,
  Text,
  TextInput,
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
  onValidate: (notes: Note[]) => void;
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
  onValidate,
}: Props) {
  const { t } = useTranslation();

  return (
    <RNModal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="height"
      >
        <View style={styles.fullscreenContainer}>
          <View style={styles.fullscreenImageWrapper}>
            {selectedDiag && (
              <ImageClick
                img={selectedDiag.diag.img}
                setMoleClicked={setMoleClicked}
                moleClicked={moleClicked}
                confirmedNotes={localNotes}
                onRemoveNote={(index: number) =>
                  setLocalNotes((prev) => prev.filter((_, i) => i !== index))
                }
                fullscreen
              />
            )}

            {moleClicked && (
              <View style={styles.moleCardOverlayFullscreen}>
                <BlurView intensity={20} tint="light" style={[styles.moleCard, styles.blur]}>
                  <TextInput
                    style={styles.moleInput}
                    onChangeText={setMoleInfos}
                    value={moleInfos}
                    placeholder={t("modal.placeholder")}
                    placeholderTextColor={Colors.textMuted}
                  />
                  <View style={styles.moleButtonsRow}>
                    <Pressable
                      style={styles.cancelButton}
                      onPress={() => {
                        setMoleInfos("");
                        setMoleClicked(null);
                      }}
                    >
                      <Text style={styles.cancelText}>{t("modal.cancel")}</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.okButton, !moleInfos && { opacity: 0.5 }]}
                      onPress={() => {
                        if (moleInfos && moleClicked) {
                          const updatedNotes = [
                            ...localNotes,
                            {
                              id: Date.now().toString(),
                              text: moleInfos,
                              x: moleClicked.x,
                              y: moleClicked.y,
                            },
                          ];
                          setLocalNotes(updatedNotes);
                          onValidate(updatedNotes);
                        }
                        setMoleClicked(null);
                        setMoleInfos("");
                      }}
                      disabled={!moleInfos}
                    >
                      <Text style={styles.okText}>{t("modal.ok")}</Text>
                    </Pressable>
                  </View>
                </BlurView>
              </View>
            )}
          </View>

          <Pressable
            onPress={onClose}
            style={styles.fullscreenClose}
            accessibilityLabel={t("modal.closeLabel")}
          >
            <X color={Colors.surface} size={24} />
          </Pressable>
        </View>
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
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  moleInput: {
    width: "100%",
    height: 50,
    borderRadius: Radius.xl,
    color: Colors.dark,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "TTHovesPro",
    fontSize: FontSize.lg,
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
    backgroundColor: Colors.dark,
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
    fontSize: FontSize.lg,
    fontFamily: "TTHovesPro",
  },
  okText: {
    color: Colors.surface,
    fontSize: FontSize.lg,
    fontFamily: "TTHovesPro",
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
  fullscreenContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenClose: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 16,
    padding: 8,
    borderRadius: Radius.lg,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
  },
  moleCardOverlay: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    zIndex: 5,
  },
  blur: {
    borderRadius: Radius.xl,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  fullscreenImageWrapper: {
    flex: 1,
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  moleCardOverlayFullscreen: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 40,
    zIndex: 6,
    shadowColor: "#282828ff",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 100,
    borderRadius: Radius.xl,
    elevation: 1,
    overflow: "visible",
  },
});

export default Modal;
