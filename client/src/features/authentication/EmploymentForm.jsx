import React, {useState} from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';

import SelectInput from '../../ui/SelectInput';
import ModalEmploymentType from './ModalEmploymentType';
import ModalSearch from './ModalSearch';

function EmploymentForm({profile, onSetProfile}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSearchVisible, setModalSearchVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [typeModal, setTypeModal] = useState('');

  function openModalSearch(title, type) {
    setTitleModal(title);
    setTypeModal(type);
    setModalSearchVisible(true);
  }

  function closeModalSearch() {
    setModalSearchVisible(false);
  }

  return (
    <>
      <ModalEmploymentType
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
        onSetData={onSetProfile}
        data={profile}
      />
      <ModalSearch
        title={titleModal}
        type={typeModal}
        modalSearchVisible={modalSearchVisible}
        closeModalSearch={closeModalSearch}
        onSetData={onSetProfile}
        data={profile}
      />
      <View style={{marginTop: 6, marginBottom: 100}}>
        <TouchableWithoutFeedback
          onPress={() => openModalSearch('Job Title', 'jobTitle')}>
          <View style={{marginBottom: 30}}>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: '500',
                color: '#666666',
              }}>
              Most recent job title*
            </Text>
            <SelectInput data={profile.jobTitle} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={{marginBottom: 30}}>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: '500',
                color: '#666666',
                width: 389,
              }}>
              Employment type
            </Text>

            <SelectInput data={profile.employmentType}>
              <Image
                source={require('../../../assets/images/vector.png')}
                style={{marginRight: 10}}
              />
            </SelectInput>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => openModalSearch('Company', 'company')}>
          <View style={{marginBottom: 30}}>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: '500',
                color: '#666666',
                width: 389,
              }}>
              Most recent company*
            </Text>

            <SelectInput data={profile.company?.name} type="image-text">
              {profile.company?.avatar && (
                <Image
                  style={{width: 25, height: 25, marginRight: 10}}
                  source={{uri: profile.company.avatar.url}}
                  resizeMode="stretch"
                />
              )}
            </SelectInput>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export default EmploymentForm;
