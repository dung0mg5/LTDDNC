import {baseUrlApi} from '../constants/baseUrlApi';
import Locations from '../constants/Locations';
import TitleJobs from '../constants/TitleJobs';

export async function searchCompany({name}) {
  if (!name) {
    return {data: [], errorMessage: ''};
  }

  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/companies/search?name=${name}`,
      {
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
    return {data: [], errorMessage: error.message};
  }
}

export async function searchSchool({name}) {
  if (!name) {
    return {data: [], errorMessage: ''};
  }

  try {
    const res = await fetch(
      `${baseUrlApi}/api/v1/universities/search?name=${name}`,
      {
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
    return {data: [], errorMessage: error.message};
  }
}

export async function getCompany({id}) {
  if (!id) {
    return {data: {}, errorMessage: ''};
  }

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/companies/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(data.message);
    }

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: {}, errorMessage: error.message};
  }
}

export async function getSchool({id}) {
  if (!id) {
    return {data: {}, errorMessage: ''};
  }

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/universities/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(data.message);
    }

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: {}, errorMessage: error.message};
  }
}

export function searchTitleJob({name}) {
  if (!name) {
    return {data: [], errorMessage: ''};
  }

  try {
    const data = TitleJobs.filter(title =>
      title.toLowerCase().includes(name.toLowerCase()),
    );

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: [], errorMessage: error.message};
  }
}

export function searchLocation({name}) {
  if (!name) {
    return {data: [], errorMessage: ''};
  }

  try {
    const data = Locations.filter(title =>
      title.toLowerCase().includes(name.toLowerCase()),
    );

    return {data, errorMessage: ''};
  } catch (error) {
    return {data: [], errorMessage: error.message};
  }
}

export async function searchUser({name}) {
  if (!name) {
    return {data: [], errorMessage: ''};
  }

  try {
    const res = await fetch(`${baseUrlApi}/api/v1/users/search?name=${name}`, {
      headers: {
        'Content-Type': 'application/json',
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
