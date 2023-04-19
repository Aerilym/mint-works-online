'use client';
import { Box, Card, CardContent, CardHeader, Divider, Icon, Typography } from '@mui/material';
import { Plan, PlanType } from 'mint-works/dist/plan';
import PaidIcon from '@mui/icons-material/Paid';
import StarIcon from '@mui/icons-material/Star';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HandymanIcon from '@mui/icons-material/Handyman';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
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

type MintIconName = PlanType | 'Token' | 'Star';

function EmbedMintIcon({
  embedName,
  size,
  styles,
}: {
  embedName: string;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  styles?: React.CSSProperties;
}) {
  const name = parseStringEmbed(embedName) as MintIconName;
  return <MintIcon name={name} size={size} styles={styles} />;
}

function MintIcon({
  name,
  size,
  styles,
}: {
  name: MintIconName;
  size?: 'small' | 'inherit' | 'large' | 'medium';
  styles?: React.CSSProperties;
}) {
  function parseIconName(name: MintIconName): typeof StarIcon {
    console.log(name);
    switch (name) {
      case 'Culture':
        return LocalFloristIcon;
      case 'Production':
        return EngineeringIcon;
      case 'Utility':
        return HandymanIcon;
      case 'Deed':
        return ReceiptLongIcon;
      case 'Token':
        return PaidIcon;
      case 'Star':
        return StarIcon;
      default:
        return PaidIcon;
    }
  }

  const Icon = parseIconName(name);
  return (
    <Icon
      fontSize={size}
      sx={{
        ...styles,
        fill: 'white',
        stroke: '#5e5e5e',
        strokeWidth: 1.3,
        strokeLinejoin: 'round',
      }}
    />
  );
}

function parseStringEmbed(str: string): MintIconName {
  const word = `${str.slice(1, 2)}${str.slice(2, -1).toLowerCase()}`;
  return word as MintIconName;
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
            <Box>
              <Box
                sx={{
                  position: 'absolute',
                  marginLeft: '-20px',
                }}
              >
                {types.map((word, i) => (
                  <MintIcon key={i} name={word} size="large" styles={{ marginRight: '-12px' }} />
                ))}
              </Box>

              <Typography variant="h6" fontWeight={'600'}>
                {plan.name}
              </Typography>
            </Box>
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
          <MintIcon
            key={i}
            name="Token"
            size="large"
            styles={{ marginRight: -0.6, marginLeft: -0.6 }}
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
                ? description
                    .split(' ')
                    .map((word, i) =>
                      word.startsWith(':') && word.endsWith(':') ? (
                        <EmbedMintIcon
                          key={i}
                          embedName={word}
                          size="small"
                          styles={{ marginRight: '3px', marginBottom: '2px' }}
                        />
                      ) : (
                        word + ' '
                      )
                    )
                : ''}
            </Typography>

            <Box>
              {[...Array(baseStars)].map((e, i) => (
                <EmbedMintIcon key={i} embedName={':STAR:'} size="large" />
              ))}
            </Box>
          </Box>
        </MintCardBox>
      </CardContent>
    </Card>
  );
}
