import React from "react";
import { Button, Container, Typography, Box, Grid, Card, CardHeader,CardContent, CardActions } from "@mui/material";
const tiers = [
    {
      title: 'Small Business',
      description: ['About 50 employees','',],
      price: '49.99',
      buttonText: 'Get started',
    },
    {
        title: 'Medium Business',
        description: ['About 1000 employees','',],
        price: '999.99',
        buttonText: 'Get started',
      },
    {
        title: 'Enterprise',
        description: ['More than 1000 employees',
        'AI Receipt Parser'],
        price: '2.99',
        buttonText: 'Contact Us',
      },
  ];

function PricingContent() { 
    return (
        <React.Fragment>
        <Container maxWidth="xs" align="center">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ pb: 2 }}>
                    <Typography component="h1" variant="h5">
                        Best Expense Management Tool
                    </Typography>
                </Box>
                <Box sx={{ pt: 8, pb:2 }}>
                    <Typography component="h1" variant="h5">
                        Plans and Pricing
                    </Typography>
                    <Typography component="h1" variant="subtitle2">
                        Find the perfect plan for your bussiness
                    </Typography>
                </Box>
            </Box>
        </Container>
        <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-start" justifyContent="center">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6} //if sm, 'Enterprise' = 12 and others = 6
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center' }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  
                    {tier.description.map((line) => (
                      <Typography
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
        </React.Fragment>
    );

};
export default function Landing() {
    return <PricingContent />;
}
