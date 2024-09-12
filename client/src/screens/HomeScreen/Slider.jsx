import {Animated, FlatList, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import slides from '../../data/slider';
import SliderItem from './SliderItem';
import Pagination from './Pagination';

const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null); // Reference to FlatList
  const [page, setPage] = useState(0);

  function handleScroll(event) {
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    })(event);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextPage = (page + 1) % slides.length;
      setPage(nextPage);
      flatListRef.current?.scrollToIndex({index: nextPage, animated: true});
    }, 3000);

    return () => clearInterval(intervalId);
  }, [page]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({item}) => <SliderItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <Pagination data={slides} scrollX={scrollX} />
    </View>
  );
};

export default Slider;
