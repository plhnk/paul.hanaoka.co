import Image from "next/image";
import { Card, Inset, Flex, Box, Container } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <nav className="z-50 w-full sm:w-auto fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen  sm:pb-16">
        <Card size="3" className="m-4 p-4 sm:m-8 sm:p-8 h-full">
          <Flex direction={{
            initial: 'row',
            xs: 'column', 
            // TODO match up radix and tailwind breakpoints
          }} className="sm:h-full sm:w-56">
            {'<TODO:Title>'}
            {'<TODO:Browse>'}
            {'<TODO:Connect>'}
            <Box style={{ flexGrow: 1 }} />
            {'<TODO:ThemeSwitcher>'}
          </Flex>
        </Card>
      </nav>
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
        {/* <Container size="2">main / container</Container> */}
      </main>
    </>
  );
}
