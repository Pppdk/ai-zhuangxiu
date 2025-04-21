import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// 选择反馈动画
export const SelectableCard = styled(motion.div)<{ selected?: boolean }>`
  cursor: pointer;
  border-radius: 12px;
  background: ${props => props.selected ? '#e6f7ff' : '#fff'};
  border: 2px solid ${props => props.selected ? '#1890ff' : '#f0f0f0'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(24, 144, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease-out, height 0.6s ease-out;
  }

  &:hover::before {
    width: 300%;
    height: 300%;
  }
`;

// 页面转场动画
export const pageTransitionVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

// 渐进式内容显示
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

// 庆祝动画组件
export const CelebrationEffect = () => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: ['#1890ff', '#52c41a', '#faad14', '#f5222d'][i % 4]
          }}
          initial={{
            x: '50vw',
            y: '50vh'
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: 0,
            transition: {
              duration: 1,
              ease: "easeOut",
              delay: i * 0.02
            }
          }}
        />
      ))}
    </motion.div>
  );
};

// 进度条动画
export const AnimatedProgress = styled(motion.div)<{ percent: number }>`
  height: 4px;
  background: linear-gradient(90deg, #108ee9 0%, #87d068 100%);
  border-radius: 2px;
  width: ${props => props.percent}%;
  transition: width 0.6s ease-in-out;
`;

// 波纹效果
export const RippleButton = styled(motion.button)`
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .5s, opacity 1s;
  }

  &:active::after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
  }
`;

// 提示气泡
export const Tooltip = styled(motion.div)`
  position: absolute;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  pointer-events: none;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 4px 0 4px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
  }
`;
