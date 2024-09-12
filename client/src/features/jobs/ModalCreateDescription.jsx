import {Modal, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import CustomBackIcon from '../../ui/CustomBackIcon';

export default function ModalCreateDescription({
  onSetModalVisible,
  modalVisible,
  data,
  onSetData,
}) {
  const richText = useRef();
  const [descHTML, setDescHTML] = useState('');

  const richTextHandle = descriptionText => {
    if (descriptionText) {
      setDescHTML(descriptionText);
    } else {
      setDescHTML('');
    }
  };

  // const submitContentHandle = () => {
  //   const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
  //   const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, '').trim();
  // };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onSetModalVisible(false)}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 25,
            marginTop: 20,
          }}>
          <CustomBackIcon
            icon="close"
            onPress={() => onSetModalVisible(false)}
          />
          <Text
            style={{
              fontSize: 23,
              fontWeight: '700',
              marginLeft: 15,
            }}>
            Job Description
          </Text>
          <TouchableOpacity
            onPress={() => {
              onSetData({...data, jobDescription: descHTML});
              onSetModalVisible(false);
            }}
            disabled={descHTML.trim().length <= 0}
            style={{
              marginRight: 30,
            }}>
            <Text
              style={{
                color: descHTML.trim().length <= 0 ? '#a4a4a4' : '#2e64e5',
                fontWeight: '700',
                fontSize: 20,
              }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 20,
          }}>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="Tell candidates what skills and years of experience you're looking for"
            androidHardwareAccelerationDisabled={true}
            initialContentHTML={descHTML}
            style={{
              fontWeight: '600',
              fontSize: 20,
              backgroundColor: '#fff',
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderTopColor: '#eaeaea',
          }}>
          <RichToolbar
            editor={richText}
            selectedIconTint="#000"
            iconTint="#666"
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertOrderedList,
            ]}
            style={{
              backgroundColor: '#fff',
              marginLeft: 30,
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
