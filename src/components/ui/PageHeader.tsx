import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Link from '@/components/ui/Link';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Breadcrumb {
  href: string;
  label: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumb?: Breadcrumb;
  children?: ReactNode;
}

const PageHeader = ({ title, breadcrumb, children }: PageHeaderProps) => {
  return (
    <Stack gap={2}>
      {breadcrumb && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="none"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
            href={breadcrumb.href}
          >
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {breadcrumb.label}
          </Link>
        </Breadcrumbs>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h1">{title}</Typography>
        {children}
      </Stack>
    </Stack>
  )
}

export default PageHeader;