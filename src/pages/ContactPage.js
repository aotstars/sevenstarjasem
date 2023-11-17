// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import { ContactHero, ContactContents, ContactForm } from '../components/_external-pages/contact';

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

export default function ContactPage() {
  return (
    <RootStyle title="Contact Us - 7 Star Manpower Services of Philippines Corporation" id="move_top">
      <ContactHero />
      <ContentStyle>
        <ContactContents />
        <ContactForm />
      </ContentStyle>
    </RootStyle>
  );
}
