export const FoodItem = {
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: String,
    required: false
  },
  picture: {
    type: String,
    required: true
  }
};

export const MenuSubItem = [
  {
    val: {
      type: String,
      required: true
    }
  }
];
