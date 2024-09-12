/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import SingleSearch from './SingleSearch';
import {searchUser} from '../../services/searchApi';

const ListSearch = ({route}) => {
  const {search} = route.params;
  const [listSearch, setListSearch] = useState([]);

  async function doSearchUser() {
    const {data} = await searchUser({name: search});
    setListSearch(data.data);
  }

  useEffect(() => {
    doSearchUser();
  }, [search]);

  return (
    <FlatList
      style={{
        backgroundColor: 'white',
      }}
      data={listSearch}
      renderItem={({item}) => <SingleSearch user={item} />}
    />
  );
};

export default ListSearch;
