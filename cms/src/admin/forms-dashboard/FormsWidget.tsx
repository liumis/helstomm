import { Box, Flex, Typography } from '@strapi/design-system';
import { Widget } from '@strapi/strapi/admin';
import { NavLink } from 'react-router-dom';
import { formatSubmittedAt, useFormInbox } from './useFormInbox';

const FormsWidget = () => {
  const { inbox, loading, error } = useFormInbox(5);

  if (loading) return <Widget.Loading />;
  if (error) return <Widget.Error />;
  if (!inbox || inbox.total === 0) {
    return <Widget.NoData>Dar nėra formų užklausų.</Widget.NoData>;
  }

  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      <Flex wrap="wrap" gap={2}>
        {inbox.buckets.map((bucket) => (
          <NavLink key={bucket.kind} to={bucket.href}>
            {bucket.label} · {bucket.total}
          </NavLink>
        ))}
      </Flex>

      <Flex direction="column" alignItems="stretch" gap={2}>
        {inbox.recent.map((row) => (
          <Box key={row.id} paddingTop={1} paddingBottom={1}>
            <NavLink to={row.href}>
              <Typography fontWeight="bold">{row.name}</Typography>
            </NavLink>
            <Typography variant="pi" textColor="neutral600">
              {row.label}
              {row.detail ? ` · ${row.detail}` : ''}
              {row.email ? ` · ${row.email}` : ''}
              {` · ${formatSubmittedAt(row.submittedAt)}`}
            </Typography>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default FormsWidget;
