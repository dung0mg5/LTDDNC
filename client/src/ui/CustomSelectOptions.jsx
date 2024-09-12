import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

const years = [
  1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932,
  1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945,
  1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958,
  1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971,
  1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984,
  1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
  1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
  2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
  2024,
];
const CustomSelectOptions = ({data, setData, type}) => {
  const [clicked, setClicked] = useState(false);

  return (
    <View style={{width: 200}}>
      <Pressable
        style={{
          width: '92%',
          height: 40,
          borderRadius: 5,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
          gap: 10,
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            fontWeight: 600,
            flex: 1,
          }}>
          {data[type]}
        </Text>

        <Image source={require('../../assets/images/vector.png')} />
      </Pressable>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            marginTop: 10,
            height: 200,
            width: '92%',
            borderRadius: 5,
            borderColor: '#666',
            borderWidth: 1,
            position: 'absolute',
            top: 40,
          }}>
          <FlatList
            data={years}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: '80%',
                    alignSelf: 'center',
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: '#8e8e8e',
                  }}
                  onPress={() => {
                    setData({...data, [type]: item});
                    setClicked(!clicked);
                  }}>
                  <Text style={{fontWeight: '600', fontSize: 20}}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default CustomSelectOptions;
