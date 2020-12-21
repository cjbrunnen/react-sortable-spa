export const PIPEDRIVE_URL_GET_PERSONS = `https://cjbrunnen.pipedrive.com/api/v1/persons?api_token=${process.env.REACT_APP_API_KEY}`;

export const apiGetPerson = (person_id) => {
  return `https://cjbrunnen.pipedrive.com/api/v1/persons/${person_id}?api_token=${process.env.REACT_APP_API_KEY}`;
};
