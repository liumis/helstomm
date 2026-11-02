import { Box, Flex, Main, Typography } from '@strapi/design-system';
import { Widget } from '@strapi/strapi/admin';
import { NavLink } from 'react-router-dom';
import { formatSubmittedAt, useFormInbox } from './useFormInbox';

const FormsPage = () => {
  const { inbox, loading, error } = useFormInbox(20);

  return (
    <Main>
      <Box padding={10}>
        <Flex direction="column" alignItems="stretch" gap={6}>
          <Box>
            <Typography variant="alpha" as="h1">
              Užklausos
            </Typography>
            <Typography variant="omega" textColor="neutral600">
              Visos svetainės formos vienoje vietoje: kontaktai, analizė, mokymai ir skaičiuoklės.
            </Typography>
          </Box>

          {loading && <Widget.Loading />}
          {error && <Widget.Error />}

          {inbox && (
            <>
              <Flex wrap="wrap" gap={4}>
                {inbox.buckets.map((bucket) => (
                  <Box
                    key={bucket.kind}
                    hasRadius
                    background="neutral0"
                    shadow="filterShadow"
                    padding={5}
                    style={{ minWidth: 220, flex: '1 1 220px' }}
                  >
                    <Typography variant="pi" textColor="neutral600">
                      {bucket.label}
                    </Typography>
                    <Typography variant="alpha">{bucket.total}</Typography>
                    <Box paddingTop={3}>
                      <NavLink to={bucket.href}>Atidaryti sąrašą</NavLink>
                    </Box>
                  </Box>
                ))}
              </Flex>

              <Box hasRadius background="neutral0" shadow="filterShadow" padding={5}>
                <Typography variant="beta">Paskutinės užklausos</Typography>
                {inbox.recent.length === 0 ? (
                  <Box paddingTop={4}>
                    <Widget.NoData>Dar nėra formų užklausų.</Widget.NoData>
                  </Box>
                ) : (
                  <Flex direction="column" alignItems="stretch" gap={3} paddingTop={4}>
                    {inbox.recent.map((row) => (
                      <Box key={row.id} paddingBottom={3} style={{ borderBottom: '1px solid #dcdce4' }}>
                        <NavLink to={row.href}>
                          <Typography fontWeight="bold">{row.name}</Typography>
                        </NavLink>
                        <Typography variant="pi" textColor="neutral600">
                          {row.label}
                          {row.detail ? ` · ${row.detail}` : ''}
                        </Typography>
                        <Typography variant="pi" textColor="neutral500">
                          {row.email || '—'} · {formatSubmittedAt(row.submittedAt)}
                        </Typography>
                      </Box>
                    ))}
                  </Flex>
                )}
              </Box>
            </>
          )}
        </Flex>
      </Box>
    </Main>
  );
};

export default FormsPage;
