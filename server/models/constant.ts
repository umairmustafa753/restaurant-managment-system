export const FoodItem = [
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: false
    },
    picture: {
      type: String,
      required: true
    }
  }
];

export const MenuSubItem = [
  {
    val: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
];

export const MenuItems = [
  {
    categoryName: {
      type: String,
      required: true
    },
    subCategory: MenuSubItem
  }
];

export const PaidSalariesMonth = [
  {
    date: {
      type: String,
      required: true
    }
  }
];

export const UserEnum = {
  type: String,
  enum: ["customer", "employee", "owner"],
  default: "customer"
};

export const CardInfo = {
  cvc: {
    type: String,
    required: false
  },
  expiry: {
    type: String,
    required: false
  },
  number: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  }
};

export const ReservationEnum = {
  type: String,
  enum: ["pending", "cancel", "confirm"],
  default: "pending"
};

export type IUser = {
  username: string;
  password: string;
  otp: Number;
  paidSalariesMonth: Array<Object>;
};
