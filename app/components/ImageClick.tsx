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

const screenHeight = Dimensions.get("window").height;

interface ImageClickProps {
  img: ImageSourcePropType;
  setMoleClicked: (v: { x: number; y: number } | null) => void;
  moleClicked: { x: number; y: number } | null;
  confirmedNotes?: Note[];
  onRemoveNote: (index: number) => void;
}

export default function ImageClick({
  img,
  setMoleClicked,
  moleClicked,
  confirmedNotes = [],
  onRemoveNote,
}: ImageClickProps) {
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);

  const resolvedSource = img ? Image.resolveAssetSource(img) : null;
  const aspectRatio =
    resolvedSource && resolvedSource.width && resolvedSource.height
      ? resolvedSource.width / resolvedSource.height
      : 1;

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

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Image source={img} style={[styles.image, { aspectRatio }]} />

        {confirmedNotes.map((note: Note, index: number) => (
          <React.Fragment key={index}>
            <View
              style={[
                styles.confirmedMarker,
                { left: note.x - 25, top: note.y - 25 },
              ]}
            />
            <View
              style={[styles.noteTag, { left: note.x - 30, top: note.y + 40 }]}
            >
              <Text style={styles.noteTagText} numberOfLines={1}>
                {note.text}
              </Text>
              <TouchableOpacity
                onPress={() => onRemoveNote(index)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <X size={11} color="white" />
              </TouchableOpacity>
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
  noteTag: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 5,
    maxWidth: 130,
  },
  noteTagText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
    flexShrink: 1,
  },
});
