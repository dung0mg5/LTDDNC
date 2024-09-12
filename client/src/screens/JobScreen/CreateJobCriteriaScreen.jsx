/* eslint-disable react-hooks/exhaustive-deps */
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RichEditor} from 'react-native-pell-rich-editor';
import ModalCreateDescription from '../../features/jobs/ModalCreateDescription';
import {createJob} from '../../services/apiJob';
import toast from 'react-hot-toast/headless';

export default function CreateJobCriteriaScreen({route}) {
  const {jobPost} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [jobPostData, setJobPostData] = useState(jobPost);
  const navigation = useNavigation();

  const description = useRef(null);

  function handleChangeDescription() {
    description.current
      ?.setContentHTML(`<div style='font-weight: 500; font-size: 60'>
    ${jobPostData.jobDescription}</div>`);
  }

  async function handleCreateJob() {
    const {data, errorMessage} = await createJob({
      jobTitle: jobPostData.jobTitle,
      companyId: jobPostData.company._id,
      workplaceType: jobPostData.workplaceType,
      jobLocation: jobPostData.jobLocation,
      jobType: jobPostData.employmentType,
      description: jobPostData.jobDescription,
    });

    if (errorMessage) {
      return toast.error(errorMessage);
    }

    toast.success(data.message);
    navigation.navigate('main');
  }

  useEffect(() => {
    handleChangeDescription();
  }, [jobPostData.jobDescription]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <ModalCreateDescription
        onSetModalVisible={setModalVisible}
        modalVisible={modalVisible}
        data={jobPostData}
        onSetData={setJobPostData}
      />
      <Text
        style={{
          marginTop: 20,
          marginLeft: 20,
          fontSize: 25,
          fontWeight: '700',
        }}>
        Almost done! Add job criteria
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
          height: '70%',
          gap: 5,
        }}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            marginTop: 20,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#eaeaea',
            paddingBottom: 15,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 18,
                fontWeight: '700',
              }}>
              Description*
            </Text>
            {jobPostData.jobDescription.trim().length !== 0 && (
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  marginRight: 20,
                  borderWidth: 1,
                  borderRadius: 5,
                  overflow: 'hidden',
                  height: 75,
                }}>
                <RichEditor
                  initialContentHTML={`<div style='font-weight: 500; font-size: 60'>
    ${jobPostData.jobDescription}</div>`}
                  ref={description}
                  disabled={true}
                  androidHardwareAccelerationDisabled={true}
                  style={{
                    fontSize: 20,
                    borderRadius: 5,
                  }}
                />
              </View>
            )}
          </View>
          {jobPostData.jobDescription.trim().length === 0 && (
            <Image
              style={{
                marginRight: 40,
              }}
              source={require('../../../assets/icons/other-plus.png')}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
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
              Application collection*
            </Text>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                fontWeight: '500',
              }}>
              <Text
                style={{
                  color: '#2D64BC',
                  fontWeight: '700',
                }}>
                Add email or web address
              </Text>{' '}
              to get notified when receiving applicants on SocialJob
            </Text>
          </View>
          <Image
            style={{
              marginRight: 40,
              alignSelf: 'center',
            }}
            source={require('../../../assets/icons/other-plus.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#EAEAEA',
        }}>
        <Text
          style={{
            marginLeft: 20,
            marginTop: 20,
            color: '#666',
            fontWeight: '600',
            fontSize: 16,
          }}>
          By continuing, you agree to{' '}
          <Text
            style={{
              color: '#2D64BC',
            }}>
            SocialJob’s Jobs Terms and Conditions including our policies
            prohibiting discriminatory job posts.
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderWidth: 1,
              borderRadius: 25,
              marginRight: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#676767',
              }}>
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCreateJob}
            disabled={jobPostData.jobDescription.trim().length === 0}
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderWidth: 1,
              borderColor:
                jobPostData.jobDescription.trim().length === 0 && '#EAEAEA',
              backgroundColor:
                jobPostData.jobDescription.trim().length === 0
                  ? '#EAEAEA'
                  : '#2D64BC',
              borderRadius: 25,
              marginRight: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color:
                  jobPostData.jobDescription.trim().length === 0
                    ? '#a4a4a4'
                    : '#fff',
              }}>
              Post job
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
