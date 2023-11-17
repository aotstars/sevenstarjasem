// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { InquiryHero, InquiryForm, InquiryContents } from '../components/_external-pages/inquiry';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function InquiryPage() {
  return (
    <RootStyle title="Inquiry - 7 Star Manpower Services of Philippines Corporation" id="move_top">
      <InquiryHero />
      <ContentStyle>
        <InquiryForm />
        <InquiryContents />
      </ContentStyle>
    </RootStyle>
  );
}
