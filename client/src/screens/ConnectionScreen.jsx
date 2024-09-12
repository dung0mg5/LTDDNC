import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import SingleConnection from '../features/network/SingleConnection';
import SearchConnection from '../features/network/SearchConnection';
import ModalRemoveConnection from '../features/network/ModalRemoveConnection';
import {removeConnection} from '../services/apiNetwork';

const ConnectionScreen = ({route}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const {connections: cons} = route.params;
  const [connections, setConnections] = useState(cons);

  async function handleRemoveConnection() {
    await removeConnection({connectionId: selectedConnection._id});

    setConnections(prevConnection => {
      return {
        data: prevConnection.data.filter(
          connection => connection._id !== selectedConnection._id,
        ),
        count: prevConnection.count - 1,
      };
    });
    setModalVisible(false);
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      {showSearch && <SearchConnection onSetShowSearch={setShowSearch} />}
      {modalVisible && (
        <ModalRemoveConnection
          selectedConnection={selectedConnection}
          onRemoveConnection={handleRemoveConnection}
          onCloseModal={() => setModalVisible(false)}
        />
      )}
      {!showSearch && (
        <View
          style={{
            borderColor: '#e9e9e9',
            borderBottomWidth: 1,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 70,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#666',
              fontWeight: '600',
            }}>
            {connections.count} connections
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 30,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setShowSearch(true)}>
              <Image source={require('../../assets/icons/lookup.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/options.png')} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <FlatList
        data={connections.data}
        renderItem={({item}) => (
          <SingleConnection
            connection={item}
            onOpenModal={() => {
              setModalVisible(true);
              setSelectedConnection(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default ConnectionScreen;
