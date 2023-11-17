/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
import request from './base/request';
import storage from './base/storage';

const sign_in_email = (form) => request.post('/v2/auth/login', form);

const get_user_documents = async () => {
  const user = await storage.getUser();
  const store = JSON.parse(user);
  return request.get(`/record/specific/documents/${store.id}/all`);
};

// eslint-disable-next-line camelcase
const post_applicant_documents_upload_record_url = async (data) => {
  const user = await storage.getUser();
  const store = JSON.parse(user);

  data.company = store.company;
  data.id = store.id;
  return request.post(`/record/upload/documents`, data);
};

const request_upload_url = async (_file) => {
  if (!_file) return false;

  const to_base64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const blob = await to_base64(_file);
  // eslint-disable-next-line
  const get_url = await fetch(`${process.env.REACT_APP_AWS_DOCUMENT_URI}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ file_type: _file.type })
  }).then((r) => {
    return r.json();
  });

  if (!get_url) return false;

  const { photoFilename, uploadURL } = get_url;
  const binary = atob(blob.split(',')[1]);

  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  const blobData = new Blob([new Uint8Array(array)], {
    type: _file.type
  });

  const result = await fetch(uploadURL, {
    method: 'PUT',
    body: blobData
  }).then((response) => {
    return response;
  });

  if (result.status === 200) {
    return photoFilename;
  } else {
    return false;
  }
};

const post_application_form = (form_data) => {
  return request.post(`/record/v2/create`, form_data, {
    headers: {
      Accept: 'multipart/form-data',
      'Content-Type': 'multipart/form-data'
    }
  });
};

const _expObject = {
  sign_in_email,
  get_user_documents,
  post_applicant_documents_upload_record_url,
  request_upload_url,
  post_application_form
};
export default _expObject;
