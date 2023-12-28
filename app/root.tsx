import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ReactNode } from "react";
import Menu from "~/components/menu";

import "~/tailwind.css";

const Layout = (props: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Menu />
    <main className="w-full max-w-7xl mx-auto flex-1 flex">
      {props.children}
    </main>
  </div>
);

export const meta: MetaFunction = () => [
  { title: "Paul Hanaoka | My personal garden on the world wide web" },
  {
    name: "description",
    content: "Musings, projects, and other random things",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
