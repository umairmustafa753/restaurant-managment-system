import * as React from "react";
import ExpandableList from "../../components/ExpandableList";

const data = [
  {
    category_name: "Item 1",
    subcategory: [{ val: "Sub Cat 1" }, { val: "Sub Cat 3" }]
  },
  {
    category_name: "Item 2",
    subcategory: [{ val: "Sub Cat 4" }, { val: "Sub Cat 5" }]
  },
  {
    category_name: "Item 3",
    subcategory: [{ val: "Sub Cat 7" }, { val: "Sub Cat 9" }]
  },
  {
    category_name: "Item 4",
    subcategory: [{ val: "Sub Cat 10" }, { val: "Sub Cat 2" }]
  },
  {
    category_name: "Item 5",
    subcategory: [{ val: "Sub Cat 13" }, { val: "Sub Cat 5" }]
  },
  {
    category_name: "Item 6",
    subcategory: [{ val: "Sub Cat 17" }, { val: "Sub Cat 8" }]
  },
  {
    category_name: "Item 7",
    subcategory: [{ val: "Sub Cat 20" }]
  },
  {
    category_name: "Item 8",
    subcategory: [{ val: "Sub Cat 22" }]
  },
  {
    category_name: "Item 9",
    subcategory: [{ val: "Sub Cat 26" }, { val: "Sub Cat 7" }]
  },
  {
    category_name: "Item 10",
    subcategory: [{ val: "Sub Cat 28" }, { val: "Sub Cat 0" }]
  },
  {
    category_name: "Item 11",
    subcategory: [{ val: "Sub Cat 31" }]
  },
  {
    category_name: "Item 12",
    subcategory: [{ val: "Sub Cat 34" }]
  },
  {
    category_name: "Item 13",
    subcategory: [{ val: "Sub Cat 38" }, { val: "Sub Cat 9" }]
  },
  {
    category_name: "Item 14",
    subcategory: [{ val: "Sub Cat 40" }, { val: "Sub Cat 2" }]
  },
  {
    category_name: "Item 15",
    subcategory: [{ val: "Sub Cat 43" }, { val: "Sub Cat 44" }]
  }
];

const MenuScreen = () => {
  return <ExpandableList data={data} />;
};

export default MenuScreen;
