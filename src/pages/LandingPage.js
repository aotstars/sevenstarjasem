// material
import { styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingStores,
  LandingTeam,
  LandingBusiness,
  LandingAccreditations,
  LandingTestimony
} from '../components/_external-pages/landing';

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

export default function LandingPage() {
  return (
    <RootStyle title="7 Star Manpower Services of Philippines Corporation" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingStores />
        <LandingTeam />
        <LandingBusiness />
        <LandingAccreditations />
        <LandingTestimony />
      </ContentStyle>
    </RootStyle>
  );
}
