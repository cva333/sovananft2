import { InstructionsModal } from '../InstructionsModal';
import React from 'react';
import { LABELS } from '../../constants';
// import { ConnectButton } from '@oyster/common';

interface HowToBuyModalProps {
  buttonClassName: string;
  onClick?: any;
}

export const HowToBuyModal: React.FC<HowToBuyModalProps> = ({
  buttonClassName,
  onClick,
}) => {
  return (
    <InstructionsModal
      buttonClassName={buttonClassName}
      buttonText="How to Buy"
      modalTitle={`Buying NFTs on ${LABELS.STORE_NAME}`}
      cardProps={[
        {
          title: 'Step 1 - Connect Wallet',
          imgSrc: '/modals/how-to-buy-1.svg',
          description: `Pellentesque id magna eget quam fermentum porta. Integer lobortis laoreet blandit. Proin et libero finibus, faucibus purus ac, lobortis ante.`,
        },
        {
          title: 'Step 2 - Choose your NFT',
          imgSrc: '/modals/how-to-buy-2.svg',
          description: `Pellentesque id magna eget quam fermentum porta. Integer lobortis laoreet blandit. Proin et libero finibus, faucibus purus ac, lobortis ante.`,
        },
        {
          title: `Step 3 - Connect Wallet`,
          imgSrc: '/modals/how-to-buy-3.svg',
          description: `Pellentesque id magna eget quam fermentum porta. Integer lobortis laoreet blandit. Proin et libero finibus, faucibus purus ac, lobortis ante.`,
          // endElement: <ConnectButton className={'secondary-btn'} />,
        },
      ]}
      onClick={onClick}
    />
  );
};
