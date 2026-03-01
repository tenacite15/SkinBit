import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { Note } from "../store/types";
import { Colors, FontSize, Radius, Spacing } from "../constants/theme";
import { BlurView } from "expo-blur";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

interface ImageClickProps {
  img: ImageSourcePropType;
  setMoleClicked: (v: { x: number; y: number } | null) => void;
  moleClicked: { x: number; y: number } | null;
  confirmedNotes?: Note[];
  onRemoveNote: (index: number) => void;
  fullscreen?: boolean;
}

export default function ImageClick({
  img,
  setMoleClicked,
  moleClicked,
  confirmedNotes = [],
  onRemoveNote,
  fullscreen = false,
}: ImageClickProps) {
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);

  const resolvedSource = img ? Image.resolveAssetSource(img) : null;
  const aspectRatio =
    resolvedSource && resolvedSource.width && resolvedSource.height
      ? resolvedSource.width / resolvedSource.height
      : 1;

  const naturalWidth = resolvedSource?.width ?? undefined;
  const naturalHeight = resolvedSource?.height ?? undefined;

  useEffect(() => {
    if (!moleClicked) {
      setMarker(null);
    }
  }, [moleClicked]);

  const handlePress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setMoleClicked({ x: locationX, y: locationY });
    setMarker({ x: locationX, y: locationY });
  };

  const containerStyle = fullscreen ? styles.fullscreenContainer : styles.container;

  let imageStyle: any;
  if (fullscreen) {
    if (naturalWidth && naturalHeight) {
      const scale = Math.min(
        1,
        screenWidth / naturalWidth,
        screenHeight / naturalHeight
      );
      const displayW = Math.round(naturalWidth * scale);
      const displayH = Math.round(naturalHeight * scale);
      imageStyle = { width: displayW, height: displayH, resizeMode: "contain" };
    } else {
      imageStyle = [styles.fullscreenImage, { aspectRatio }];
    }
  } else {
    imageStyle = [styles.image, { aspectRatio }];
  }

  return (
    <View style={containerStyle}>
      <Pressable onPress={handlePress}>
        <Image source={img} style={imageStyle} />

        {confirmedNotes.map((note: Note, index: number) => (
            
          <React.Fragment key={index}>
            <View
              style={[
                styles.confirmedMarker,
                { left: note.x - 25, top: note.y - 25 },
              ]}
            />
            <View style={[styles.noteTagWrapper, { left: note.x - 30, top: note.y + 40 }]}>
              <BlurView intensity={30} tint="light" style={styles.noteTag}>
                <Text style={styles.noteTagText} numberOfLines={1}>
                  {note.text}
                </Text>
                <TouchableOpacity
                  onPress={() => onRemoveNote(index)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <X size={11} color="white" />
                </TouchableOpacity>
              </BlurView>
            </View>
          </React.Fragment>
        ))}

        {marker && (
          <Pressable
            onPress={() => {
              setMarker(null);
              setMoleClicked(null);
            }}
            style={[
              styles.marker,
              {
                left: marker.x - 25,
                top: marker.y - 25,
              },
            ]}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    maxHeight: screenHeight * 0.7,
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxHeight: screenHeight * 0.7,
    resizeMode: "contain",
  },
  marker: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  confirmedMarker: {
    position: "absolute",
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "white",
    opacity: 0.4,
  },
  noteTagWrapper: {
    position: "absolute",
    borderRadius: 5,
    shadowColor: Colors.dark,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  noteTag: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
  },
  noteTagText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: "600",
    flexShrink: 1,
  },
  fullscreenContainer: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  moleCard: {
    borderRadius: Radius.xl,
    padding: Spacing.md,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  blur: {
    borderRadius: Radius.xl,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
});

