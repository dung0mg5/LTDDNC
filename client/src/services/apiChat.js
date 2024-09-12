import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrlApi} from '../constants/baseUrlApi';

export async function accessChats({formData}) {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/chats?isGroupChat=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
      body: formData.toString(),
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(data.message);
    }

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: [], errorMessage: error.message};
  }
}

export async function getChats() {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/chats`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(data.message);
    }

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: [], errorMessage: error.message};
  }
}

export async function getMessages({chatId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/chats/${chatId}/message`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(data.message);
    }

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: [], errorMessage: error.message};
  }
}

export async function sendMessage({chatId, formData}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/chats/${chatId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.message);
    }

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: null, errorMessage: error.message};
  }
}
