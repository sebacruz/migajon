'use client';

import {
  ActionIcon,
  Group,
  Skeleton,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
  rem
} from '@mantine/core';
import { deleteResource, getAllResources } from '../../utils/api';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [clients, setClients] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getClients() {
      const clients = await getAllResources(class Client {});

      console.log(clients);

      setClients(clients);
      setLoading(false);
    }

    getClients();
  }, []);

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
          {loading && (
            <>
            <TableTr>
              <TableTd colSpan={5}>
                <Skeleton>Loading...</Skeleton>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd colSpan={5}>
                <Skeleton>Loading...</Skeleton>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd colSpan={5}>
                <Skeleton>Loading...</Skeleton>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd colSpan={5}>
                <Skeleton>Loading...</Skeleton>
              </TableTd>
            </TableTr>
            <TableTr>
              <TableTd colSpan={5}>
                <Skeleton>Loading...</Skeleton>
              </TableTd>
            </TableTr>
            </>
          )}
          {clients &&
            clients.map((client) => {
              return (
                <TableTr key={client.id}>
                  <TableTd>{client.id}</TableTd>
                  <TableTd>{client.name}</TableTd>
                  <TableTd>{client.email}</TableTd>
                  <TableTd>{client.phone}</TableTd>
                  <TableTd>
                    <Group gap={0} justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        component={Link}
                        href={`/clients/${client.id}`}
                      >
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
