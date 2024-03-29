import styled from 'styled-components';
import Link from 'next/link';

import RelinkLogoIcon from '../../assets/icons/RelinkLogo';

const Icon = styled(RelinkLogoIcon)`
  position: absolute;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 5.6em;

  color: var(--color-text-primary);

  transition: fill 0.2s ease-in-out;

  :hover {
    color: var(--color-text-secondary);
  }
`;

const HeaderLogo = () => (
  <Link href={'/'} passHref>
    <a>
      <Icon />
    </a>
  </Link>
);

export default HeaderLogo;
