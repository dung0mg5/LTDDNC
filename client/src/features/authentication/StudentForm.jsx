import React, {useState} from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';

import CustomSelectOptions from '../../ui/CustomSelectOptions';
import SelectInput from '../../ui/SelectInput';
import ModalSearch from './ModalSearch';

function StudentForm({profile, onSetProfile}) {
  const [modalSearchVisible, setModalSearchVisible] = useState(false);

  return (
    <>
      <ModalSearch
        title="School"
        type="school"
        modalSearchVisible={modalSearchVisible}
        closeModalSearch={() => setModalSearchVisible(false)}
        onSetData={onSetProfile}
        data={profile}
      />
      <View style={{marginTop: 10, marginBottom: 200}}>
        <TouchableWithoutFeedback onPress={() => setModalSearchVisible(true)}>
          <View style={{marginBottom: 30}}>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 20,
                fontWeight: '500',
                color: '#666666',
              }}>
              University/School*
            </Text>
            <SelectInput data={profile.school?.name} type="image-text">
              {profile.school?.avatar && (
                <Image
                  style={{width: 25, height: 25, marginRight: 10}}
                  source={{uri: profile.school.avatar.url}}
                  resizeMode="stretch"
                />
              )}
            </SelectInput>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            marginBottom: 30,
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View
            style={{
              flexDirection: 'column',
              gap: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: '#666666',
                width: 100,
              }}>
              Start year*
            </Text>
            <CustomSelectOptions
              setData={onSetProfile}
              data={profile}
              type="startYear"
            />
          </View>
          <View style={{flexDirection: 'column', gap: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: '#666666',
              }}>
              End year*
            </Text>
            <CustomSelectOptions
              setData={onSetProfile}
              data={profile}
              type="endYear"
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default StudentForm;
