import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import {
  searchCompany,
  searchLocation,
  searchSchool,
  searchTitleJob,
} from '../../services/searchApi';
import MiniSpinner from '../../ui/MiniSpinner';

const ModalView = styled.View`
  height: 932px;
  background-color: white;
`;

const Search = styled.View`
  margin-top: 20px;
  height: 50px;
  width: 100%;
  padding: 15px;
  border-width: 1px;
  border-color: #eaeaea;
`;

const ModalSearch = ({
  title,
  type,
  modalSearchVisible,
  closeModalSearch,
  onSetData,
  data,
}) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(data);

  async function handlePress(item) {
    if (type === 'location') {
      onSetData(item);
    } else if (type === 'jobLocation') {
      onSetData({...data, jobLocation: item});
    } else {
      onSetData({
        ...data,
        [type]: type === 'jobTitle' ? item : {...item},
      });
    }

    setResults([]);
    setSearch('');
    closeModalSearch();
  }

  useEffect(() => {
    async function handleSearch() {
      setIsLoading(true);
      if (type === 'company') {
        const {data: companies} = await searchCompany({name: search});
        setResults(companies);
      } else if (type === 'school') {
        const {data: schools} = await searchSchool({name: search});
        setResults(schools);
      } else if (type === 'jobTitle') {
        const {data: titleJobs} = searchTitleJob({name: search});
        setResults({data: titleJobs});
      } else if (type === 'location' || type === 'jobLocation') {
        const {data: locations} = searchLocation({name: search});
        setResults({data: locations});
      }
      setIsLoading(false);
    }

    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, type]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalSearchVisible}
      onRequestClose={() => closeModalSearch()}>
      <ModalView>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 65,
            textAlign: 'center',
          }}>
          {title}
        </Text>
        <Search>
          <TextInput
            placeholder="Title (ex. Fullstack Engineering"
            placeholderTextColor="#666"
            style={{fontSize: 16, fontWeight: '700'}}
            onChangeText={setSearch}
          />
        </Search>
        <View
          style={{
            height: '100%',
            width: '100%',
            borderColor: '#EAEAEA',
            marginTop: 5,
          }}>
          {!isLoading ? (
            <FlatList
              data={results.data}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                      borderColor: '#EAEAEA',
                    }}
                    onPress={() => handlePress(item)}>
                    {(type === 'company' || type === 'school') && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 15,
                        }}>
                        <Image
                          style={{width: 40, height: 40, marginLeft: 15}}
                          source={{uri: item.avatar.url}}
                          resizeMode="stretch"
                        />

                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 16,
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              color: '#666666',
                            }}>
                            {type === 'company'
                              ? `Company - ${item.typeOfBusiness}`
                              : `School - ${item.region}`}
                          </Text>
                        </View>
                      </View>
                    )}
                    {(type === 'jobTitle' ||
                      type === 'location' ||
                      type === 'jobLocation') && (
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 16,
                          marginLeft: 20,
                        }}>
                        {item}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <MiniSpinner />
          )}
        </View>
      </ModalView>
    </Modal>
  );
};

{
  /* {type === 'company' ||
                    (type === 'school' && (
   <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 15,
                        }}>
                        <CustomImage originPath="'../../../assets/companyAvatars" />
                        <View>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 16,
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 13,
                              color: '#666666',
                            }}>
                            {type === 'company'
                              ? `Company - ${item.typeOfBusiness}`
                              : `School - ${item.region}`}
                          </Text>
                        </View>
                      </View> 
                  ))}
                      
                      */
}
export default ModalSearch;
