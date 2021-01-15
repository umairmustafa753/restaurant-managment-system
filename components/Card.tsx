import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Card, Title } from "react-native-paper";

const Card = () => {
  return (
    <TouchableOpacity>
      <Card>
        <Card.Content>
          <Title>Edit Accoount</Title>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default Card;
