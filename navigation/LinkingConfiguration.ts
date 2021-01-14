import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home"
            }
          },
          Menu: {
            screens: {
              MenuScreen: "menu"
            }
          },
          Reservation: {
            screens: {
              MenuScreen: "reservation"
            }
          },
          Account: {
            screens: {
              MenuScreen: "Account"
            }
          }
        }
      },
      NotFound: "*"
    }
  }
};
