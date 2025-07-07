import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface BreadcrumbItem {
  path: string;
  label: string;
  isLast: boolean;
}

interface BreadcrumbsProps {
  customPaths?: {
    [key: string]: string;
  };
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customPaths = {} }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Handle special cases and custom labels
  const defaultPathLabels: { [key: string]: string } = {
    'solar-screens': 'Solar Screens',
    'powerwashing': 'Power Washing',
    'gutter-cleaning': 'Gutter Cleaning',
    'track-cleaning': 'Track Cleaning',
    'car-detailing-las-vegas': 'Car Detailing',
    'estimate': 'Free Estimate',
    'service-areas': 'Service Areas',
    'las-vegas': 'Las Vegas',
    'henderson': 'Henderson',
    'summerlin': 'Summerlin',
    'north-las-vegas': 'North Las Vegas',
    'spring-valley': 'Spring Valley',
    'boulder-city': 'Boulder City',
    'enterprise': 'Enterprise',
    'mesquite': 'Mesquite',
    'paradise': 'Paradise',
    'centennial-hills': 'Centennial Hills',
  };

  // Combine default labels with custom labels
  const pathLabels = { ...defaultPathLabels, ...customPaths };

  // Skip breadcrumbs on homepage
  if (pathnames.length === 0) {
    return null;
  }

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = pathnames.map((value, index) => {
    const isLast = index === pathnames.length - 1;
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = pathLabels[value] || value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

    return {
      path,
      label,
      isLast
    };
  });

  // Add home as first item
  breadcrumbItems.unshift({
    path: '/',
    label: 'Home',
    isLast: breadcrumbItems.length === 0
  });

  return (
    <Container fluid className="breadcrumb-container py-2" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
      <Container>
        <Row>
          <Col>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0" style={{ backgroundColor: 'transparent' }}>
                {breadcrumbItems.map((item, index) => (
                  <li key={index} className={`breadcrumb-item ${item.isLast ? 'active' : ''}`} aria-current={item.isLast ? 'page' : undefined}>
                    {index === 0 ? (
                      <Link to={item.path} style={{ color: '#074a5a', textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faHome} /> {item.label}
                      </Link>
                    ) : item.isLast ? (
                      <span style={{ color: '#6c757d' }}>{item.label}</span>
                    ) : (
                      <Link to={item.path} style={{ color: '#074a5a', textDecoration: 'none' }}>
                        {item.label}
                      </Link>
                    )}
                    {!item.isLast && <FontAwesomeIcon icon={faAngleRight} className="mx-2 text-muted" style={{ fontSize: '0.8rem' }} />}
                  </li>
                ))}
              </ol>
            </nav>
          </Col>
        </Row>

        {/* Add structured data for breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': breadcrumbItems.map((item, index) => ({
              '@type': 'ListItemButton',
              'position': index + 1,
              'name': item.label,
              'item': `https://definedcleaning.com${item.path}`
            }))
          })}
        </script>
      </Container>
    </Container>
  );
};

export default Breadcrumbs;