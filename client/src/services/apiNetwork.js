import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrlApi} from '../constants/baseUrlApi';

export async function getPendingConnection({page = 1, limit = 3}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/pending?page=${page}&limit=${limit}`,
      {
        headers: {
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
    return {data: [], errorMessage: error.message};
  }
}

export async function rejectPendingConnection({connectionId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/${connectionId}/reject`,
      {
        method: 'POST',
        headers: {
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

export async function confirmPendingConnection({connectionId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/${connectionId}/confirm`,
      {
        method: 'POST',
        headers: {
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

export async function getSentConnection({page = 1, limit = 3}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/sent?page=${page}&limit=${limit}`,
      {
        headers: {
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
    return {data: [], errorMessage: error.message};
  }
}

export async function withdrawSentConnection({connectionId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/${connectionId}/withdraw`,
      {
        method: 'POST',
        headers: {
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

export async function getConnections({page = 1, limit = 3}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections?page=${page}&limit=${limit}`,
      {
        headers: {
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

export async function removeConnection({connectionId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/${connectionId}`,
      {
        method: 'DELETE',
        headers: {
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

export async function getFollowingPeople({page = 1, limit = 3}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/following?page=${page}&limit=${limit}`,
      {
        headers: {
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
    return {data: [], errorMessage: error.message};
  }
}

export async function followUser({userId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/${userId}/follow`,
      {
        method: 'POST',
        headers: {
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

export async function unfollowUser({userId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/${userId}/unfollow`,
      {
        method: 'POST',
        headers: {
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

export async function requestConnection({userId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/connections/${userId}`, {
      method: 'POST',
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
    return {data: null, errorMessage: error.message};
  }
}

export async function checkUserIsConnected({userId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/connections/${userId}/check`,
      {
        method: 'POST',
        headers: {
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
