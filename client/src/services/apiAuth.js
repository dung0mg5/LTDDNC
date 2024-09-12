import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrlApi} from '../constants/baseUrlApi';

export async function login({email, password}) {
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/users/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
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

export async function logout() {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const res = await fetch(`${baseUrlApi}/api/v1/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
    });

    if (!res.ok) {
      throw new Error('Logout failed');
    }

    return {errorMessage: ''};
  } catch (error) {
    return {errorMessage: error.message};
  }
}

export async function checkAuth() {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const res = await fetch(`${baseUrlApi}/api/v1/auth`, {
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

export async function forgotPassword({email}) {
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
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

export async function sendEmailVerification({userId, type}) {
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/users/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId, type}),
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

export async function verifyOtp({token, email}) {
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/users/verify-otp?token=${token}&email=${email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

export async function resetPassword({token, email, newPassword}) {
  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/users/reset-password?token=${token}&email=${email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newPassword}),
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

export async function signup(userInfo) {
  try {
    const res = await fetch(`${baseUrlApi}/api/v1/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
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
