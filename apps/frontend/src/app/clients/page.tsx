import {
  ActionIcon,
  Group,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
  rem
} from '@mantine/core';
import { getAllResources } from '../../utils/api';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

export default async function Page() {
  const clients = await getAllResources(class Client {});

  return (
    <>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>#</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Email</TableTh>
            <TableTh>Phone</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>

        <TableTbody>
          {clients.map((client) => {
            return (
              <TableTr key={client.id}>
                <TableTd>{client.id}</TableTd>
                <TableTd>{client.name}</TableTd>
                <TableTd>{client.email}</TableTd>
                <TableTd>{client.phone}</TableTd>
                <TableTd>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray" component={Link} href={`/clients/${client.id}`}>
                      <IconEye
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Group>
                </TableTd>
              </TableTr>
            );
          })}
        </TableTbody>
      </Table>
    </>
  );
}
