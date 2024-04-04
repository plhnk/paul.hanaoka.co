import Image from "next/image";
import { Flex, Box, Container } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <div
        className="fixed top-0 left-0 h-svh w-svw bg-black bg-cover bg-center -z-50"
        style={{
          backgroundImage: `
          linear-gradient(to top right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, .50) 59%, rgba(0, 0, 0, 0.85) 100%),
            url(
            "https://images.unsplash.com/photo-1580106815415-1d1a768d27cc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          )`,
        }}
      />
      <nav className="fixed top-0 left-0 h-screen pb-16">
        <Flex
          direction="column"
          className="bg-neutral-900 m-8 p-8 h-full rounded-lg w-64"
        >
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
          <Box style={{flexGrow:1}} />
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
      </nav>
      <main className="ml-80 m-8 bg-gray-900">
        <Container size='2'>
          main / container
        </Container>
      </main>
    </>
  );
}
