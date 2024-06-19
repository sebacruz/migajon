import { Title } from '@mantine/core';

export default async function Layout({ children }) {
  return (
    <>
      <Title>Clients</Title>

      {children}
    </>
  );
}
