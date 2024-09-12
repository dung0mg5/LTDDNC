/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import React, {useEffect, useRef} from 'react';
import {RichEditor} from 'react-native-pell-rich-editor';
import Button from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';
import {calculateTimeAgo} from '../../utils/helper';

const Overlay = styled.View`
  flex: 0.2;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function ModalDetailJob({
  modalVisible,
  onSetModalVisible,
  selectedJob,
  onSetSelectedJob,
}) {
  const description = useRef(null);
  const navigation = useNavigation();

  function handleChangeDescription() {
    description.current
      ?.setContentHTML(`<div style='font-weight: 500; font-size: 60'>
    ${selectedJob.description}</div>`);
  }

  useEffect(() => {
    handleChangeDescription();
  }, [selectedJob.description]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => onSetModalVisible(false)}>
      <TouchableWithoutFeedback
        onPress={() => {
          onSetModalVisible(false);
          onSetSelectedJob({});
        }}>
        <Overlay />
      </TouchableWithoutFeedback>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            paddingBottom: 25,
            paddingTop: 10,
          }}>
          <View
            style={{
              width: 50,
              backgroundColor: '#fff',
              height: 7,
              borderRadius: 5,
              marginTop: 10,
            }}
          />
          <View
            style={{
              width: 80,
              backgroundColor: '#666',
              height: 7,
              borderRadius: 5,
              marginTop: 10,
            }}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
            }}>
            <Image source={require('../../../assets/icons/dot.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: 20,
          }}>
          <Text
            style={{
              marginTop: 15,
              fontSize: 27,
              fontWeight: 700,
              color: '#000',
            }}>
            {selectedJob.jobTitle}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              gap: 10,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={{
                uri: selectedJob.company?.avatar.url,
              }}
            />
            <View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                {selectedJob.company?.name}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                {selectedJob?.jobLocation}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#666',
                fontSize: 16,
                fontWeight: 600,
              }}>
              {calculateTimeAgo(selectedJob.updatedAt)}
            </Text>
            <View
              style={{
                width: 3,
                height: 3,
                borderRadius: 50,
                backgroundColor: '#000',
              }}
            />
            <Text style={{fontSize: 16, fontWeight: 600, color: '#38764A'}}>
              {selectedJob.applicants?.length} applicants
            </Text>
          </View>
          <View
            style={{
              marginTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={require('../../../assets/icons/job.png')}
              tintColor="#666"
            />
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontWeight: 600,
              }}>
              {selectedJob.workplaceType}
            </Text>
            <View
              style={{
                width: 3,
                height: 3,
                borderRadius: 50,
                backgroundColor: '#000',
              }}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontWeight: 600,
              }}>
              {selectedJob.jobType}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Button
              onHandlePress={() => {
                onSetModalVisible(false);
                navigation.navigate('apply-job', {
                  job: selectedJob,
                });
              }}
              backgroundColor="#2D64BC"
              colorText="#fff"
              width={180}
              padding={8}>
              <Text>Apply</Text>
            </Button>
            <Button
              borderColor="#2D64BC"
              borderWidth={1}
              backgroundColor="#fff"
              colorText="#2D64BC"
              width={180}
              padding={8}>
              <Text>Save</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#E8E5E0',
            height: 10,
          }}
        />
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#000',
            }}>
            About the job
          </Text>
          <RichEditor
            initialContentHTML={`<div style='font-weight: 500; font-size: 60'>
    ${selectedJob.description}</div>`}
            ref={description}
            disabled={true}
            androidHardwareAccelerationDisabled={true}
            style={{
              fontSize: 20,
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
