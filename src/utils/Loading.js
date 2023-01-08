import React from 'react';
import { motion } from 'framer-motion';
import { circleStyle, containerStyle, spinTransition } from './modalframer';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingWrapper>
      <div style={containerStyle}>
        <motion.span
          style={circleStyle}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
      </div>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
export default Loading;
