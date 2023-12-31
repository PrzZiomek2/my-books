import React from 'react';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Typography from '@mui/material/Typography';
import ButtonLink from '@/components/ui/ButtonLink';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';


export const DefaultCriteria = async () => {
  const session = await getServerSession(authOptions); 
  const userId = session?.user.user._id; 

  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography>
         Domyślnie pokazujemy sugestie na podstawie informacji jakie podałeś w profilu, czyli opis, tagi oraz lista ulubionych i
         przeczytanych książek. Kliknij Wyniki aby zobaczyć propozycje.
      </Typography>
      <Tooltip title={!userId ? "zaloguj się w celu koprzystania z sugestii" : ""}>
        <span style={{textAlign: "center"}}>
          <ButtonLink
            linkHref={{
              pathname: '/suggestions-results',
              query: { fromProfile: true },
            }}
            variant="contained"
            sx={{
              marginTop: "30px",
              width: { xs: "80%", md: "auto" }
            }}
            disabled={!userId}
          >
            Wyniki
          </ButtonLink>
        </span>
      </Tooltip>
    </Box>
  )
}
