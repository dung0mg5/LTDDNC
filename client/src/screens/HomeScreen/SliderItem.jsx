import {Dimensions, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('window');

const Container = styled.View`
  width: ${width}px;
  height: ${height}px;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 50%;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const SliderItem = ({item}) => {
  return (
    <Container>
      <StyledImage source={item.image} resizeMode="contain" />
      <View>
        <Title>{item.title}</Title>
      </View>
    </Container>
  );
};

export default SliderItem;
