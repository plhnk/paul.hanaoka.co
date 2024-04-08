/* eslint-disable @next/next/no-img-element */
import { Card, Inset, Flex, Box, Container } from "@radix-ui/themes";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="">
        <Container className="">
          <Box className="h-full">
          <Card size="3">
            <Inset clip="padding-box">
              <img
                className="w-full object-cover bg-white sm:h-[calc(100vh-4rem)]"
                src="https://images.unsplash.com/photo-1580106815415-1d1a768d27cc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={""}
                // style={{height: 'calc(100vh - 4rem)'}}
              />
            </Inset>
          </Card>
          </Box>
        </Container>
      </main>
    </>
  );
}
