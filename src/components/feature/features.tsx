import React from 'react';
import FeatureCard from './featureCard';
import WindowIcon from '@mui/icons-material/Window';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BuildIcon from '@mui/icons-material/Build';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import HouseIcon from '@mui/icons-material/House';
import './features.css'

const features = [
    {
        icon: <WindowIcon style={{ color: "#074a5a" }} />,
        title: 'Inside, outside, or both',
        description: 'We can clean just the outside if you want to save some money, or clean both the inside and the outside. If you want just the inside, we can do that too.'
    },
    {
        icon: <ApartmentIcon style={{ color: "#074a5a" }} />,
        title: '1-story & 2-story buildings',
        description: 'We provide cleaning services for both 1-story and 2-story buildings.'
    },
    {
        icon: <BusinessIcon style={{ color: "#074a5a" }} />,
        title: 'Residential and business',
        description: 'Our services are available for both residential and business properties.'
    },
    {
        icon: <HomeIcon style={{ color: "#074a5a" }} />,
        title: 'Luxury and non-luxury homes',
        description: 'We cater to both luxury and non-luxury homes with the same level of care and attention.'
    },
    {
        icon: <WindowIcon style={{ color: "#074a5a" }} />,
        title: 'Screens included with every service',
        description: 'We include screen cleaning with every service to ensure a thorough clean.'
    },
    {
        icon: <WindowIcon style={{ color: "#074a5a" }} />,
        title: 'Window sills included in every service',
        description: 'Window sills are included in every service to provide a complete cleaning solution.'
    },
    {
        icon: <LocalCarWashIcon style={{ color: "#074a5a" }} />,
        title: 'Power wash driveway and patios',
        description: 'We offer power washing services for driveways and patios to keep them looking their best.'
    },
    {
        icon: <HouseIcon style={{ color: "#074a5a" }} />,
        title: 'Pressure wash exterior walls of your home',
        description: 'Our pressure washing services can clean the exterior walls of your home effectively.'
    },
    {
        icon: <BuildIcon style={{ color: "#074a5a" }} />,
        title: 'Screen Repair or Replacement',
        description: 'In addition to cleaning, we can repair or rebuild any missing or damaged screens.'
    },
    {
        icon: <StarIcon style={{ color: "#074a5a" }} />,
        title: 'All 5-Star Reviews',
        description: 'All our reviews are 5 stars ⭐⭐⭐⭐⭐. We work hard on your windows to keep it that way.  Our commitment to quality has earned us 5-star reviews from all our customers.'
    },
    {
        icon: <VerifiedUserIcon style={{ color: "#074a5a" }} />,
        title: 'Licensed and Insured',
        description: 'We are licensed and insured up to $1 million for your peace of mind.'
    }
];

const Features = () => {
    return (
        <div className="features-container">
            <h1 className="features-title">Why You Should Work With Us</h1>
            <div className="features-grid">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Features;