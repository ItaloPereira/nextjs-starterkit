import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const EventsTableSkeleton = () => {
  return (
    <Box>
      <Skeleton height={80} />
      <Skeleton height={80} sx={{ marginTop: -2}} />
      <Skeleton height={80} sx={{ marginTop: -2}} />
      <Skeleton height={80} sx={{ marginTop: -2}} />
      <Skeleton height={80} sx={{ marginTop: -2}} />
    </Box>
  );
}

export default EventsTableSkeleton;