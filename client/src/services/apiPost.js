import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrlApi} from '../constants/baseUrlApi';

export async function createPost({formData}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/posts/create`, {
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

export async function getFollowingUserPosts({page, limit}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/posts?page=${page}&limit=${limit}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'same-origin',
      },
    );

    const data = await res.json();

    if (data.error) {
      throw new Error(data.message);
    }

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: null, errorMessage: error.message};
  }
}

export async function getComments({postId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/posts/${postId}/comment`, {
      headers: {
        'Content-Type': 'application/json',
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
    return {data: null, errorMessage: error.message};
  }
}

export async function createComment({postId, content}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/posts/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
      body: JSON.stringify({content}),
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

export async function getReactsPost({postId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/posts/${postId}/react`, {
      headers: {
        'Content-Type': 'application/json',
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
    return {data: null, errorMessage: error.message};
  }
}

export async function createReact({postId, type}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/posts/${postId}/react`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
      body: JSON.stringify({type}),
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
