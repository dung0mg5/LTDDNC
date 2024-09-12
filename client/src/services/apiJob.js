import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrlApi} from '../constants/baseUrlApi';

export async function searchJob({jobLocation, jobTitle}) {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/jobs/search?jobTitle=${jobTitle}&jobLocation=${jobLocation}`,
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

export async function detailJob({jobId}) {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/jobs/${jobId}`, {
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

export async function createJob({
  jobTitle,
  companyId,
  workplaceType,
  jobLocation,
  jobType,
  description,
}) {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/jobs/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        jobTitle,
        companyId,
        workplaceType,
        jobLocation,
        jobType,
        description,
      }),
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

export async function applyJob({jobId, formData}) {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/jobs/${jobId}/upload-resume`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/form-data',
        },
        credentials: 'same-origin',
        body: formData,
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

export async function getPostedJobs() {
  const accessToken = await AsyncStorage.getItem('accessToken');

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/jobs/posted-jobs`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/form-data',
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
