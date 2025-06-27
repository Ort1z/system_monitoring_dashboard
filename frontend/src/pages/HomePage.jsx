import React from 'react';
import { 
  Box, Typography, Button, Grid, 
  Container, Paper, Avatar, styled 
} from '@mui/material';
import { 
  Timeline, NotificationsActive, 
  DataUsage, Settings, Videocam 
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import FeatureCard from '../components/FeatureCard';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  opacity: 0.2,
  animation: `${float} 6s ease-in-out infinite`,
  zIndex: -1,
}));

const HomePage = () => {
  const features = [
    {
      icon: <Timeline />,
      title: "Real-Time Metrics",
      description: "View and analyze system performance data in real time with dynamic visualizations and up-to-the-minute updates."
    },
    {
      icon: <NotificationsActive />,
      title: "AI-Powered Alerts",
      description: "Smart alerts that learn from your system behavior to reduce false positives and detect anomalies before they become issues."
    },
    {
      icon: <DataUsage />,
      title: "Interactive Visualizations",
      description: "Leverage advanced visualization tools to create custom dashboards and gain insights from your data effortlessly."
    },
    {
      icon: <Settings />,
      title: "Voice & AR Controls",
      description: "Control your dashboard with voice commands or visualize your infrastructure in augmented reality for immersive monitoring."
    }
  ];

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShape sx={{ width: 300, height: 300, top: -100, left: -100, animationDelay: '0s' }} />
      <FloatingShape sx={{ width: 200, height: 200, bottom: -50, right: -50, animationDelay: '2s' }} />
      <FloatingShape sx={{ width: 150, height: 150, top: '20%', right: '10%', animationDelay: '4s' }} />
      
      <Container maxWidth="lg" sx={{ 
        py: 10,
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 3,
            fontWeight: 800,
            background: 'linear-gradient(45deg, #00f5d4 30%, #f15bb5 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          System Monitor
        </Typography>
        
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ 
            mb: 4,
            maxWidth: 800,
            mx: 'auto',
            color: 'text.secondary'
          }}
        >
          A comprehensive web-based platform to monitor and manage system performance and infrastructure with cutting-edge 2025 technology.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large"
            href="/dashboard"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 600
            }}
          >
            Explore the Dashboard
          </Button>
          
          <Button 
            variant="outlined" 
            size="large"
            href="#features"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '12px',
              fontWeight: 600
            }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
      
      <Box id="features" sx={{ py: 10, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 6,
              textAlign: 'center',
              fontWeight: 700
            }}
          >
            Next-Gen Monitoring Features
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard {...feature} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
                Own Your System By Monitoring It
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                The System Monitor was inspired by the need for a unified platform that helps IT teams and DevOps professionals efficiently monitor and manage their systems. Our goal was to create a tool that not only provides real-time metrics but also offers flexibility and customization to meet diverse monitoring needs.
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                This is a Portfolio Project for ALX School. For more details, visit our GitHub Repository.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Box sx={{ 
                  position: 'relative',
                  paddingTop: '56.25%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundColor: 'black'
                }}>
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Videocam sx={{ fontSize: 60 }} />
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                  Watch Our Introduction Video
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" sx={{ mb: 6, textAlign: 'center', fontWeight: 700 }}>
            The Developer
          </Typography>
          
          <Box sx={{ 
            maxWidth: 600,
            mx: 'auto',
            textAlign: 'center'
          }}>
            <Avatar 
              src="/path/to/developer-image.jpg" 
              sx={{ 
                width: 120, 
                height: 120,
                mx: 'auto',
                mb: 3
              }} 
            />
            <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
              MASINGITA OTTIS MALULEKE
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Software Engineer / Fullstack Developer (The Freelancer)
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Backend Developer, Frontend Developer, DevOps Engineer
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="outlined" size="small">LinkedIn</Button>
              <Button variant="outlined" size="small">GitHub</Button>
              <Button variant="outlined" size="small">Twitter</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;