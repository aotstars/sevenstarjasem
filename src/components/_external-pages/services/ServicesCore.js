// material
import { styled } from '@material-ui/core/styles';
import { Container, Typography, Card, Box, Grid } from '@material-ui/core';

//
import { motion } from 'framer-motion';
import { varFadeInDown } from '../../animate';

const RootStyle = styled('div')(() => ({
  position: 'relative',
  marginBottom: 64,
  paddingTop: 24,
  paddingBottom: 24,
  display: 'flex',
  alignItems: 'center'
}));

const cover = '/static/background/wavy-one.png';
const SERVICE_CORE = [
  {
    id: 0,
    title: 'Focus on Core Business Activities',
    description:
      'By passing on supporting processes, you’ll gain freedom to focus skills and resources on strengthening and improving core business processes.',
    image: '/static/services/business-activities.png'
  },
  {
    id: 1,
    title: 'Get Access to Top Talents',
    description:
      'We find the right staff for you. We train them according to your needs and supervise them to ensure sustained productivity',
    image: '/static/services/greater-access-to-talents.png'
  },
  {
    id: 2,
    title: 'Cost Reduction',
    description:
      'Access to top talents and quality service is almost always going to be cheaper than hiring and maintaining full time employees.',
    image: '/static/services/cost-reduction.png'
  },
  {
    id: 3,
    title: 'Greater Competitive Advantage',
    description:
      'By outsourcing particular process, businesses are often able to substantially improve performance by drawing on the skills of top talents.',
    image: '/static/services/great-competitiveness.png'
  },
  {
    id: 4,
    title: 'Business Growth',
    description:
      'Outsourcing has been proven to increase operations productivity, business value, product quality, customer loyalty and so much more.',
    image: '/static/services/business-growth.png'
  },
  {
    id: 5,
    title: 'Risk Management',
    description:
      'By outsourcing certain processes on to industry experts, you will benefit from their enhanced ability to plan and mitigate potential risks',
    image: '/static/services/risk-management.png'
  }
];

export default function ServicesCore() {
  return (
    <RootStyle
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#FFFFFF'
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ width: '100%' }}>
          {SERVICE_CORE &&
            SERVICE_CORE.map((value, index) => (
              <Grid item xs={12} md={6} key={index} sx={{ p: 2 }}>
                <motion.div variants={varFadeInDown} key={index}>
                  <Card
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: { xs: 400, md: 400 },
                      p: { xs: 4, md: 0 }
                    }}
                  >
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={value.image}
                        sx={{ width: 100, objectFit: 'contain', margin: '24px auto' }}
                      />
                      <Typography variant="h4" color="common.black" component="h3" sx={{ my: 2 }}>
                        {value.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="common.black"
                        component="p"
                        sx={{ fontWeight: '400', width: { xs: '100%', md: '75%' }, margin: 'auto' }}
                      >
                        {value.description}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
