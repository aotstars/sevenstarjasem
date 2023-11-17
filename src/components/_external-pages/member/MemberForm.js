/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { useState, useEffect, useCallback } from 'react';
import { capitalCase } from 'change-case';
// material
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { Card, Grid, Container, Box, CardHeader, Typography, CardContent } from '@material-ui/core';
import LoadingScreen from '../../LoadingScreen';
import user_api from '../../../api/user';
import { UploadSingleFile } from '../../upload';

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'relative',
  paddingTop: 42,
  display: 'flex',
  alignItems: 'center'
}));

// ----------------------------------------------------------------------
const DOCUMENTS_LIST = [
  'psa-nso',
  'hs-diploma',
  'health-card',
  'mayors-permit',
  'nbi',
  'sss-e1',
  'philhealth',
  'pagibig',
  'tin',
  'picture',
  'attire'
];

export default function MemberForm() {
  const [singleFile, setFile] = useState([]);
  const [isLoading, setLoading] = useState([]);
  const [DOCUMENTS_TO_UPLOAD, setDocumentUpload] = useState([]);
  const [EXISTING_DOCUMENT, setExistingDocument] = useState([]);

  const handleSaveDocument = async (type) => {
    setLoading((prevState) => ({ ...prevState, [type]: true }));
    if (!singleFile[type] || !singleFile[type].file) {
      setLoading((prevState) => ({ ...prevState, [type]: false }));
      return alert(`Empty file ${capitalCase(type)}`);
    }

    const upload_image = await user_api.request_upload_url(singleFile[type].file);
    if (!upload_image) {
      setLoading((prevState) => ({ ...prevState, [type]: false }));
      return alert('Something went wrong in uploading your image.');
    }

    const data = {
      company: undefined, // to be added in request user_api
      id: undefined,
      name: upload_image,
      type
    };

    try {
      const response = await user_api.post_applicant_documents_upload_record_url(data);
      if (response.status === 200) {
        alert(`Uploading of ${label(type)} success`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const load = async () => {
      const request = await user_api.get_user_documents();
      if (!request.ok) {
        return setLoading(false);
      }

      const existing = [];

      const payload = request.data;
      await payload.data.forEach((value) => {
        const index = DOCUMENTS_LIST.indexOf(value.doctype);
        if (index !== -1) {
          existing.push(value.doctype);
          DOCUMENTS_LIST.splice(index, 1);
        }
      });

      setExistingDocument(existing);
      setDocumentUpload(DOCUMENTS_LIST);
    };

    load();
  }, []);

  const handleDropSingleFile = useCallback((acceptedFiles, DOCUMENT_TYPE) => {
    console.log('acceptedFiles', acceptedFiles, DOCUMENT_TYPE);
    const file = acceptedFiles[0];
    if (file) {
      setFile((prevState) => ({
        ...prevState,
        [DOCUMENT_TYPE]: {
          ...file,
          preview: URL.createObjectURL(file),
          file
        }
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const label = (value) => {
    switch (value) {
      case 'psa-nso':
        return 'PSA / NSO Birth Certificate';
      case 'hs-diploma':
        return 'High School Diploma';
      case 'health-card':
        return 'Health Card';
      case 'mayors-permit':
        return 'Mayors Permit';
      case 'nbi':
        return 'NBI';
      case 'sss-e1':
        return 'SSS E1 Form / Registration Form';
      case 'philhealth':
        return 'Philhealth Member’s Data Form/ ID';
      case 'pagibig':
        return 'Pag-IBIG Member’s Data Form/ ID';
      case 'tin':
        return 'TIN Id';
      case 'attire':
        return 'Screenshot of applicant grooming and attire';
      case 'picture':
        return '2x2 picture';
      default:
        return value;
    }
  };

  return (
    <>
      <RootStyle>
        <Container maxWidth="lg">
          {DOCUMENTS_TO_UPLOAD.length === 0 && (
            <Typography
              component="h2"
              variant="h3"
              color="common.black"
              sx={{ textAlign: 'center', mt: { xs: 2, md: 3 }, mb: 10 }}
            >
              Kindly notify your recruiter manager to validate your uploaded documents.
            </Typography>
          )}
          <Typography
            component="h2"
            variant="h6"
            color="common.black"
            sx={{ textAlign: 'left', mt: { xs: 2, md: 3 }, mb: 1 }}
          >
            List of Under Recruiter review
          </Typography>
          {EXISTING_DOCUMENT &&
            EXISTING_DOCUMENT.map((value, key) => (
              <Box key={key} sx={{ textAlign: 'left', px: 2 }}>
                <ul>
                  <li>
                    <Typography key={key} variant="overline" color="common.black">
                      {value}
                    </Typography>
                  </li>
                </ul>
              </Box>
            ))}
          {DOCUMENTS_TO_UPLOAD.length > 0 && (
            <Typography
              component="h2"
              variant="h3"
              color="common.black"
              sx={{ textAlign: 'center', my: { xs: 2, md: 3 } }}
            >
              Pending Documents required.
            </Typography>
          )}

          <Box sx={{ textAlign: 'center', mb: 10, mt: 3 }}>
            <Grid
              container
              spacing={3}
              sx={{
                justifyContent: 'center',
                width: { xs: '100%', md: '100%' },
                margin: { xs: '0', md: 'auto' }
              }}
            >
              <Box sx={{ width: '100%', margin: { xs: '0', md: 'auto' } }}>
                <Grid container spacing={3}>
                  {DOCUMENTS_TO_UPLOAD &&
                    DOCUMENTS_TO_UPLOAD.map((value, key) => {
                      const title = label(value);
                      return (
                        <Grid item xs={12} md={4} key={key}>
                          {isLoading[value] && <LoadingScreen />}

                          <Card key={key}>
                            <CardHeader title={capitalCase(title)} />
                            {!isLoading[value] && (
                              <>
                                <CardContent>
                                  <UploadSingleFile
                                    file={singleFile[value]}
                                    onDrop={(e) => {
                                      handleDropSingleFile(e, value);
                                    }}
                                  />
                                </CardContent>

                                <LoadingButton
                                  fullWidth
                                  size="large"
                                  onClick={() => handleSaveDocument(value)}
                                  variant="text"
                                  loading={isLoading[value]}
                                >
                                  Upload
                                </LoadingButton>
                              </>
                            )}
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Container>
      </RootStyle>
    </>
  );
}
