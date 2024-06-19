import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
} from '@mantine/core';
import { getAllResources } from '../../utils/api';

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
              </TableTr>
            );
          })}
        </TableTbody>
      </Table>
    </>
  );
}
