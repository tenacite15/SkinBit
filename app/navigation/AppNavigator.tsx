import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/Header";
import HomeScreen from "../screens/Home";
import PatientFileScreen from "../screens/PatientFile";
import i18n from "../i18n";
import type { Patient } from "../store/types";

export type RootStackParamList = {
  Home: undefined;
  PatientFile: { patient: Patient };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: ({ route }) => <Header title={route.name} />,
              }}
            />
            <Stack.Screen
              name="PatientFile"
              component={PatientFileScreen}
              options={{
                header: () => <Header title={i18n.t('navigation.patientFile')} />,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
