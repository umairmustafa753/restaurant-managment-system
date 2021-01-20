export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Menu: undefined;
  Reservation: undefined;
  Account: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type MenuParamList = {
  MenuScreen: undefined;
};

export type AccountParamList = {
  AccountScreen: undefined;
};

export type UnAuthenticatedStackParamList = {
  Login: undefined;
  Signup: undefined;
  EmailVerification: undefined;
  ResetPassword: undefined;
};

export type AuthenticatedStackParamList = {
  Account: undefined;
  UpdateAccount: undefined;
  AddUser: undefined;
  ConfirmOrders: undefined;
  PendingOrders: undefined;
  CancelOrders: undefined;
  CustomerList: undefined;
  EmployeeList: undefined;
  Reservation: undefined;
};
