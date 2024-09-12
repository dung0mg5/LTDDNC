import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../../ui/Button';
import {useNavigation} from '@react-navigation/native';
import ModalSearch from '../../features/authentication/ModalSearch';
import ModalEmploymentType from '../../features/authentication/ModalEmploymentType';

const defaultJobPost = {
  jobTitle: '',
  company: {},
  workplaceType: '',
  jobLocation: '',
  employmentType: '',
  jobDescription: '',
};

export default function CreateJobScreen() {
  const [jobPost, setJobPost] = useState(defaultJobPost);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSearchVisible, setModalSearchVisible] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [typeModal, setTypeModal] = useState('');
  const [typeModalSelect, setTypeModalSelect] = useState('');
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation();

  function openModalSearch(title, type) {
    setTitleModal(title);
    setTypeModal(type);
    setModalSearchVisible(true);
  }

  function openModalSelect(type) {
    setTypeModalSelect(type);
    setModalVisible(true);
  }

  function closeModalSearch() {
    setModalSearchVisible(false);
  }

  console.log(jobPost);

  useEffect(() => {
    if (
      jobPost.company !== '' &&
      jobPost.employmentType !== '' &&
      jobPost.jobLocation !== '' &&
      jobPost.jobTitle !== '' &&
      jobPost.workplaceType !== ''
    ) {
      setDisabled(false);
    }
  }, [jobPost]);

  return (
    <>
      <ModalEmploymentType
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
        onSetData={setJobPost}
        data={jobPost}
        typeModal={typeModalSelect}
      />
      <ModalSearch
        title={titleModal}
        type={typeModal}
        modalSearchVisible={modalSearchVisible}
        closeModalSearch={closeModalSearch}
        onSetData={setJobPost}
        data={jobPost}
      />

      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            fontSize: 25,
            fontWeight: '700',
          }}>
          Let's create your job post
        </Text>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            color: '#666',
            fontWeight: '600',
            fontSize: 16,
          }}>
          * Indicates required
        </Text>
        <View
          style={{
            flexDirection: 'column',
            gap: 5,
          }}>
          <TouchableOpacity
            onPress={() => openModalSearch('Job Title', 'jobTitle')}
            style={{
              marginTop: 20,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#eaeaea',
              paddingBottom: 15,
            }}>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Job title*
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {jobPost.jobTitle || 'Add job title'}
              </Text>
            </View>
            <Image
              style={{
                marginRight: 40,
              }}
              source={require('../../../assets/icons/other-plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModalSearch('Company', 'company')}
            style={{
              marginTop: 20,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#eaeaea',
              paddingBottom: 15,
            }}>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Job company*
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {jobPost.company?.name || 'Add job company'}
              </Text>
            </View>
            <Image
              style={{
                marginRight: 40,
              }}
              source={require('../../../assets/icons/other-plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModalSelect('workplaceType')}
            style={{
              marginTop: 20,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#eaeaea',
              paddingBottom: 15,
            }}>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Workplace type*
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {jobPost.workplaceType || 'Add workplace type'}
              </Text>
            </View>
            <Image
              style={{
                marginRight: 40,
              }}
              source={require('../../../assets/icons/other-plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModalSearch('Job Location', 'jobLocation')}
            style={{
              marginTop: 20,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#eaeaea',
              paddingBottom: 15,
            }}>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Job location*
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {jobPost.jobLocation || 'Add job location'}
              </Text>
            </View>
            <Image
              style={{
                marginRight: 40,
              }}
              source={require('../../../assets/icons/other-plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModalSelect('employmentType')}
            style={{
              marginTop: 20,
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#eaeaea',
              paddingBottom: 15,
            }}>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Job type*
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                {jobPost.employmentType || 'Add job type'}
              </Text>
            </View>
            <Image
              style={{
                marginRight: 40,
              }}
              source={require('../../../assets/icons/other-plus.png')}
            />
          </TouchableOpacity>
        </View>

        <Button
          margin={[70, 0, 0, 0]}
          backgroundColor={disabled ? '#eaeaea' : '#2D64BC'}
          colorText={disabled ? '#a4a4a4' : '#fff'}
          onHandlePress={() =>
            navigation.navigate('create-job-criteria', {
              jobPost: jobPost,
            })
          }>
          Draft job on my own
        </Button>
        <Pressable
          onPress={() =>
            navigation.navigate('create-job-criteria', {
              jobPost: jobPost,
            })
          }>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
              color: '#666',
              fontSize: 18,
              fontWeight: '600',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '80%',
            }}>
            Limits may apply to free job posts.{' '}
            <Text
              style={{
                color: '#2D64BC',
              }}>
              View your policy
            </Text>
          </Text>
        </Pressable>
      </View>
    </>
  );
}
