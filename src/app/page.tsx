import Image from "next/image";
import { Card, Inset, Flex, Box, Container } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <nav className="fixed top-0 left-0 h-screen pb-16">
        <Card size="3" className="m-8 p-8" style={{ height: "100%" }}>
          <Flex direction="column" className="h-full w-56">
            paul.hanaoka.co
            <Box>
              <ul>
                <li>About</li>
                <li>Portfolio</li>
                <li>Blog</li>
              </ul>
            </Box>
            <Box>
              <ul>
                <li>Email</li>
                <li>GitHub</li>
                <li>Twitter</li>
              </ul>
            </Box>
            <Box style={{ flexGrow: 1 }} />
            <Box>
              <ul>
                <li>System</li>
                <li>Dark</li>
                <li>Light</li>
                <li>Fun</li>
                <li>Serious</li>
              </ul>
            </Box>
          </Flex>
        </Card>
      </nav>
      <main className="">
        <Container className="">
          <Box className="h-full">
          <Card size="3">
            <Inset clip="padding-box">
              <img
                className="w-full object-cover bg-white"
                src="https://images.unsplash.com/photo-1580106815415-1d1a768d27cc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={""}
                style={{height: 'calc(100vh - 4rem)'}}
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
