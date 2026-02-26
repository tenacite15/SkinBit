import { registerRootComponent } from "expo";
import "./app/i18n";
import AppNavigator from "./app/navigation/AppNavigator";

function App() {
  return <AppNavigator />;
}

registerRootComponent(App);
