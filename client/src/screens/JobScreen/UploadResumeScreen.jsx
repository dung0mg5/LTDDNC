/* eslint-disable react-hooks/exhaustive-deps */
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomBackIcon from '../../ui/CustomBackIcon';
import {useNavigation} from '@react-navigation/native';
import Button from '../../ui/Button';
import DocumentPicker from 'react-native-document-picker';
import toast from 'react-hot-toast/headless';
import {applyJob} from '../../services/apiJob';
import Spinner from '../../ui/Spinner';

import {useAuth} from '../../context/AuthContext';
import {createNotification} from '../../services/apiNotification';

export default function UploadResume({route}) {
  const {job, mobilePhone, phoneCountryCode, email} = route.params;
  const [fileResponse, setFileResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {socket} = useAuth();

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      toast.error('No file selected');
    }
  }, []);

  async function handleUploadResume() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', {
      uri: fileResponse[0].uri,
      type: 'application/pdf',
      name: 'resume.png',
    });

    formData.append('phone', mobilePhone);
    formData.append('phoneCountryCode', phoneCountryCode);
    formData.append('email', email);

    const {data, errorMessage} = await applyJob({
      jobId: job._id,
      formData,
    });
    setIsLoading(false);

    if (errorMessage) {
      return toast.error(errorMessage);
    }

    navigation.navigate('main');
    toast.success(data.message);
  }

  async function handleCreateNotification() {
    await createNotification({
      owner: job.writer._id,
      content: `You have a new applicant to ${job.jobTitle} job`,
    });

    socket.emit('notification', {
      owner: job.writer._id,
      content: `You have a new applicant to ${job.jobTitle} job`,
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {isLoading && <Spinner />}
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 20,
          alignItems: 'center',
          gap: 60,
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <CustomBackIcon icon="close" />
        <Text
          numberOfLines={1}
          style={{
            fontWeight: '700',
            width: 300,
            fontSize: 20,
          }}>
          Apply to {job.company.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            marginTop: 20,
          }}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontWeight: '700',
            }}>
            Resume*
          </Text>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              fontSize: 15,
              fontWeight: '600',
              color: '#666',
            }}>
            Be sure to include an updated resume
          </Text>

          {fileResponse[0]?.name && (
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#ddd',
                marginLeft: 20,
                marginTop: 15,
                marginRight: 20,
                borderRadius: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 80,
                  backgroundColor: '#CB3F2E',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 20,
                    paddingTop: 25,
                    paddingLeft: 5,
                  }}>
                  PDF
                </Text>
              </View>

              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  {fileResponse[0].name}
                </Text>
              </View>
            </View>
          )}
          <Button
            borderWidth={1}
            borderColor="#000"
            colorText="#666"
            margin={[50, 0, 0, 0]}
            onHandlePress={handleDocumentSelection}>
            Upload Resume
          </Button>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              color: '#666',
              fontWeight: '600',
            }}>
            PDF (2MB)
          </Text>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: '#ddd',
          marginRight: 20,
          marginTop: 430,
          marginLeft: 20,
          flexDirection: 'row',
          gap: 190,
        }}>
        <TouchableOpacity
          disabled={!email || !mobilePhone || !phoneCountryCode}
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 25,
            width: 100,
            marginTop: 15,
          }}>
          <Text
            style={{
              color: '#2D64BC',
              fontWeight: '700',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await handleUploadResume();
            await handleCreateNotification();
          }}
          disabled={!email || !mobilePhone || !phoneCountryCode}
          style={{
            backgroundColor:
              !email || !mobilePhone || !phoneCountryCode ? '#ddd' : '#2D64BC',
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 25,
            width: 100,
            marginTop: 15,
          }}>
          <Text
            style={{
              color:
                !email || !mobilePhone || !phoneCountryCode ? '#666' : '#fff',
              fontWeight: '700',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Review
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
