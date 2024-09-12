import {Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';

export default function MoreText({children}) {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
  }, []);

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 3}
        style={{
          lineHeight: 21,
          flex: 1,
          fontWeight: '500',
          fontSize: 15,
        }}>
        {children}
      </Text>
      {lengthMore ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{
            lineHeight: 21,
            position: 'absolute',
            color: '#666',
            fontWeight: '600',
            right: 0,
            top: 42,
            backgroundColor: 'white',
          }}>
          {!textShown && '...see more'}
        </Text>
      ) : null}
    </>
  );
}
