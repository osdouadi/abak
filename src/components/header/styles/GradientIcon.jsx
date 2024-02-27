import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const GradientSVG = styled(motion.svg).attrs({
  width: 30,
  height: 30,
})`

  path {
    fill: var( --color-blue-600);
  }
`;

const GradientIcon = ({ Icon}) => (
  <GradientSVG>
    <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
      <stop stopColor="#97CEE7" offset="0%" />
      <stop stopColor="#2B8CBB" offset="100%" />
    </linearGradient>
    <Icon size={30} />
  </GradientSVG>
);

GradientIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired, // or PropTypes.func.isRequired
};

export default GradientIcon;
