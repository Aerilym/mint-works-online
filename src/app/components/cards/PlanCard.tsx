'use client';
import { Box, Card, CardContent, CardHeader, Divider, Icon, Typography } from '@mui/material';
import { Plan, PlanType } from 'mint-works/dist/plan';
import PaidIcon from '@mui/icons-material/Paid';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';

function MintCardBox({ children, types }: { children: React.ReactNode; types: Array<PlanType> }) {
  const primaryType = types[0].toLowerCase();
  return (
    <Box
      borderRadius={1}
      height={'100%'}
      padding={1}
      sx={{
        backgroundColor: `mintCard.${primaryType}`,
      }}
    >
      {children}
    </Box>
  );
}

export default function PlanCard({ plan }: { plan: Plan }) {
  const { name, types, cost, description, baseStars } = plan;
  return (
    <Card
      sx={{
        height: '100%',
        aspectRatio: '0.6',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        backgroundColor: 'mintCard.background',
      }}
    >
      <CardHeader
        title={
          <MintCardBox types={[...types]}>
            <Typography variant="h5" fontWeight={'600'}>
              {plan.name}
            </Typography>
          </MintCardBox>
        }
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {[...Array(cost)].map((e, i) => (
          <PaidIcon
            key={i}
            fontSize="large"
            sx={{
              marginRight: -0.5,
              marginLeft: -0.5,
              color: 'white',
              backgroundColor: 'mintCard.border',
              borderColor: 'mintCard.border',
              borderWidth: 1,
              borderStyle: 'solid',
              borderRadius: '100%',
            }}
          />
        ))}
      </Box>

      <CardContent
        style={{
          height: '100%',
        }}
      >
        <MintCardBox types={[...types]}>
          <Box
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            {/** Replace all occurrences of :TOKEN: with <PaidIcon/> and :STAR: with <StarIcon/>*/}
            <Typography variant="body1">
              {description
                ? description.split(' ').map((word) =>
                    word === ':TOKEN:' ? (
                      <PaidIcon
                        key={word}
                        fontSize="small"
                        sx={{
                          marginRight: '3px',
                          marginBottom: '2px',
                          color: 'white',
                          backgroundColor: 'mintCard.border',
                          borderColor: 'mintCard.border',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          borderRadius: '100%',
                        }}
                      />
                    ) : word === ':STAR:' ? (
                      <StarIcon
                        key={word}
                        fontSize="small"
                        sx={{
                          marginRight: '3px',
                          marginBottom: '2px',
                          fill: 'white',
                          stroke: '#5e5e5e',
                          strokeWidth: '2px',
                          strokeLinejoin: 'round',
                        }}
                      />
                    ) : (
                      `${word} `
                    )
                  )
                : ''}
            </Typography>

            <Box>
              {[...Array(baseStars)].map((e, i) => (
                <StarIcon
                  fontSize="large"
                  key={i}
                  sx={{
                    fill: 'white',
                    stroke: '#5e5e5e',
                    strokeWidth: '2px',
                    strokeLinejoin: 'round',
                  }}
                />
              ))}
            </Box>
          </Box>
        </MintCardBox>
      </CardContent>
    </Card>
  );
}
