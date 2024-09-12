import React from 'react';
import {Text, View} from 'react-native';

function SelectInput({children, data, type = 'text'}) {
  return (
    <View
      style={{
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 40,
        width: 385,
        borderRadius: 5,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {type === 'image-text' && (children ? children : null)}
      <Text
        style={{
          color: '#000',
          fontSize: 22,
          fontWeight: 600,
          flex: 1,
          marginRight: 10,
        }}>
        {data}
      </Text>
      {type === 'text' && (children ? children : null)}
    </View>
  );
}

export default SelectInput;
