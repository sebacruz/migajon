import { Title } from '@mantine/core';

export default async function Layout({ children }) {
  return (
    <>
      <Title>Supplies</Title>

      {children}
    </>
  );
}
