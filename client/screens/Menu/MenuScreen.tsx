import * as React from "react";
import ExpandableList from "../../components/ExpandableList";

const data = [
  {
    isExpanded: false,
    category_name: "Item 1",
    subcategory: [
      { id: 1, val: "Sub Cat 1" },
      { id: 3, val: "Sub Cat 3" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 2",
    subcategory: [
      { id: 4, val: "Sub Cat 4" },
      { id: 5, val: "Sub Cat 5" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 3",
    subcategory: [
      { id: 7, val: "Sub Cat 7" },
      { id: 9, val: "Sub Cat 9" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 4",
    subcategory: [
      { id: 10, val: "Sub Cat 10" },
      { id: 12, val: "Sub Cat 2" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 5",
    subcategory: [
      { id: 13, val: "Sub Cat 13" },
      { id: 15, val: "Sub Cat 5" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 6",
    subcategory: [
      { id: 17, val: "Sub Cat 17" },
      { id: 18, val: "Sub Cat 8" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 7",
    subcategory: [{ id: 20, val: "Sub Cat 20" }]
  },
  {
    isExpanded: false,
    category_name: "Item 8",
    subcategory: [{ id: 22, val: "Sub Cat 22" }]
  },
  {
    isExpanded: false,
    category_name: "Item 9",
    subcategory: [
      { id: 26, val: "Sub Cat 26" },
      { id: 27, val: "Sub Cat 7" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 10",
    subcategory: [
      { id: 28, val: "Sub Cat 28" },
      { id: 30, val: "Sub Cat 0" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 11",
    subcategory: [{ id: 31, val: "Sub Cat 31" }]
  },
  {
    isExpanded: false,
    category_name: "Item 12",
    subcategory: [{ id: 34, val: "Sub Cat 34" }]
  },
  {
    isExpanded: false,
    category_name: "Item 13",
    subcategory: [
      { id: 38, val: "Sub Cat 38" },
      { id: 39, val: "Sub Cat 9" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 14",
    subcategory: [
      { id: 40, val: "Sub Cat 40" },
      { id: 42, val: "Sub Cat 2" }
    ]
  },
  {
    isExpanded: false,
    category_name: "Item 15",
    subcategory: [
      { id: 43, val: "Sub Cat 43" },
      { id: 44, val: "Sub Cat 44" }
    ]
  }
];

const MenuScreen = () => {
  return <ExpandableList data={data} />;
};

export default MenuScreen;
