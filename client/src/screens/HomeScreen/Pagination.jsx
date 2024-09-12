import {Animated, Dimensions} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  bottom: 500px;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const Dot = styled(Animated.View)`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  border-color: #000;
  border-width: 1px;
  background-color: #fff;
  margin: 0 5px;
`;

const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX}) => {
  return (
    <Container>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#fff', '#000', '#fff'],
        });
        return <Dot key={idx.toString()} style={{backgroundColor: dotColor}} />;
      })}
    </Container>
  );
};

export default Pagination;
